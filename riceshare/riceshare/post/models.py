from django.db import models
from riceshare.users.models import User

class Post(models.Model):
    user = models.ForeignKey(User);
    post = models.CharField(max_length = 500);
