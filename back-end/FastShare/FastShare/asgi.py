"""
ASGI config for FastShare project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from fileupload.routing import websocket_urlpatterns as fileupload_websocket_urlpatterns
from webrtc.routing import websocket_urlpatterns as webrtc_websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "FastShare.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # Just HTTP for now. (We can add other protocols later.)
    "websocket": AuthMiddlewareStack(URLRouter(fileupload_websocket_urlpatterns + webrtc_websocket_urlpatterns)),
})