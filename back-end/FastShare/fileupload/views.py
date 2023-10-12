import random
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import File
from .serializers import FileSerializer
from django.http import HttpResponse
import datetime

class FileListCreateAPIView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

def generate_receiveCode():
    code = random.randint(0, 999999)
    # pad with 0s to make 6 digits
    while len(str(code)) < 6:
        code = int(str(code) + '0')

    return code

@api_view(['POST'])
def upload_file(request):
    file = request.FILES['file']
    name = file.name
    filetype = file.name.split('.')[-1]
    filesize = file.size
    receive_Code = generate_receiveCode()

    # check if receiveCode is unique
    while File.objects.filter(receiveCode=receive_Code).exists():
        receive_Code = generate_receiveCode()

    file_obj = File.objects.create(name=name, file=file, filetype=filetype, filesize=filesize, receiveCode=receive_Code)
    return Response({'message': 'File uploaded successfully', 'id': file_obj.id, 'receiveCode': file_obj.receiveCode}, status=201)

@api_view(['POST'])
def cancel_upload(request):
    file_id = request.data['file_id']
    receive_Code = request.data['receive_Code']
    try:
        file = File.objects.get(id=file_id, receiveCode=receive_Code)
    except File.DoesNotExist:
        return Response({'message': 'File not found'}, status=404)
    
    file.delete()
    return Response({'message': 'Cancel successfully, the file has delected.'}, status=200)

@api_view(['GET'])
def download_file(request, receive_Code):
    file = File.objects.get(receiveCode=receive_Code)
    file_path = file.file.path
    with open(file_path, 'rb') as f:
        response = HttpResponse(f, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file.name}"'
        response['Access-Control-Expose-Headers'] = 'Content-Disposition'

        # check if upload time is less than 10 minutes ago
        upload_time = file.uploaded_at
        current_time = datetime.datetime.now(upload_time.tzinfo)
        time_diff = current_time - upload_time
        if time_diff.total_seconds() > 600:
            return Response({'message': 'Your receive code expired!'}, status=410)

        return response
    return Response({'message': 'File not found'}, status=404)
