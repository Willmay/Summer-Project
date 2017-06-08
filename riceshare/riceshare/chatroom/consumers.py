from channels.handler import AsgiHandler
from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http

#Connected
@channel_session
def ws_connect(message):
	#Accept the incoming connection
	message.reply_channel.send({
			"accept": True
		})
	room = message.content['path'].strip("/")
	message.channel_session['room'] = room
	Group("chat-%s" % room).add(message.reply_channel)

#Send message
@channel_session
def ws_message(message):
	Group("chat-%s" % message.channel_session['room']).send({
			"text": message['text'],
		})

#Disconnect
@channel_session
def ws_disconnect(message):
	Group("chat-%s" % message.channel_session['room']).discard(message.reply_channel)