import random
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import File
from .serializers import FileSerializer
from django.http import HttpResponse

class FileListCreateAPIView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

def generate_receiveCode():
    return random.randint(000000, 999999)

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

@api_view(['GET'])
def download_file(request, receive_Code):
    file = File.objects.get(receiveCode=receive_Code)
    file_path = file.file.path
    with open(file_path, 'rb') as f:
        response = HttpResponse(f, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file.name}"'
        return response
    return Response({'message': 'File not found'}, status=404)
