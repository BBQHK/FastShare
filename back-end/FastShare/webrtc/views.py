import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ReceiveCodeRecord

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
    while ReceiveCodeRecord.objects.filter(receiveCode=receive_Code).exists():
        receive_Code = generate_receiveCode()
    ReceiveCodeRecord.objects.create(receiveCode=receive_Code)
    return Response({'receive_Code': receive_Code}, status=200)
