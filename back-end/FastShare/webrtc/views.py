import datetime
from django.utils import timezone
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ReceiveCodeTempStorage, ReceiveCodeCreateRecord

def generate_receiveCode():
    code = random.randint(0, 999999)
    # pad with 0s to make 6 digits
    while len(str(code)) < 6:
        code = int(str(code) + '0')

    return code
# Create your views here.
@api_view(['GET'])
def webrtc_connection(request): # return the receive code for user create the websocket connection
    receive_Code = generate_receiveCode()
    while ReceiveCodeTempStorage.objects.filter(receiveCode=receive_Code).exists():
        # check the created_at of the receive code, if it is > 10 min, delete it
        receiveCodeTempStorage = ReceiveCodeTempStorage.objects.get(receiveCode=receive_Code)
        if receiveCodeTempStorage.created_at < timezone.now() - datetime.timedelta(minutes=10):
            receiveCodeTempStorage.delete()
            break
        else:
            receive_Code = generate_receiveCode()
    ReceiveCodeTempStorage.objects.create(receiveCode=receive_Code)
    ReceiveCodeCreateRecord.objects.create(createrIP=request.META.get('REMOTE_ADDR'), receiveCode=receive_Code)

    return Response({'receive_Code': receive_Code}, status=200)
