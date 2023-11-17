from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # re_path(r'(?P<receive_Code>\w+)/$', consumers.FileDownloadConsumer.as_asgi()),
    re_path(r'^ws/download_status/(?P<receive_Code>\w+)/$', consumers.FileDownloadConsumer.as_asgi()),
]