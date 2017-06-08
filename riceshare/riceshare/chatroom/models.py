from django.db import models

# Create your models here.


class ChatMessage(models.Model):
	room = models.TextField()
	message = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)