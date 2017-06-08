from channels.handler import AsgiHandler
from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http

#dispatch massages
def msg_consumer(message):
	#Save to model
	room = message.content['room']
	ChatMessage.objects.create(
		room = room,
		message = message.content['message'],
		)
	#Broadcast to listening sockets
	Group("chat-%s" % room).send({
			"text": message.content['text'],
			"user": message.content['user'],
		})


#Connected
@channel_session
def ws_connect(message):
	room = message.content['path'].strip("/")
	message.channel_session['room'] = room
	Group("chat-%s" % room).add(message.reply_channel)
	#Accept the incoming connection
	message.reply_channel.send({
			"accept": True
		})

#Receive message
@channel_session
def ws_message(message):
	#Stick the message onto the processing queue
	Channel("chat-messages").send({
		"room": message.channel_session['room'],
		"message": message['text'],
		"user": message['user'],
		})

#Disconnect
@channel_session
def ws_disconnect(message):
	Group("chat-%s" % message.channel_session['room']).discard(message.reply_channel)