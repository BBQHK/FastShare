from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/p2p_signal/(?P<receive_Code>\w+)/$', consumers.SignallingConsumer.as_asgi()),
]