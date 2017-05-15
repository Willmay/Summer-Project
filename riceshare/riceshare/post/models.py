from django.db import models
from riceshare.users.models import User

class Post(models.Model):
    user = models.ForeignKey(User)
    post = models.CharField(max_length = 500)
    image = models.ImageField(null = True, blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
