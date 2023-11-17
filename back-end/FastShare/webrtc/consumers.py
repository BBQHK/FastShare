from channels.generic.websocket import AsyncWebsocketConsumer

# create a consumer to handle and exchange the offer and answer of WebRTC

class SignallingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.receive_Code = self.scope['url_route']['kwargs']['receive_Code']
        self.group_name = 'p2p_signal_%s' % self.receive_Code

        # Join the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # receive the offer and answer from the sender and receiver and send it to the other side
    async def receive(self, text_data):
        # print(text_data)
        # Send the message to the group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'send_message',
                'message': text_data,
                'sender_channel_name': self.channel_name  # Add the sender's channel name
            }
        )
    
    # send the offer and answer to the other side
    async def send_message(self, event):
        message = event['message']
        sender_channel_name = event['sender_channel_name']  # Get the sender's channel name

        # Check if the sender's channel name matches the current channel name
        if self.channel_name != sender_channel_name:
            # Send the message to the WebSocket client
            await self.send(text_data=message)
    