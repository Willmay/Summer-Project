from django.db import models
from django.contrib import admin
from riceshare.users.models import User


class Post(models.Model):
    user = models.ForeignKey(User)
    post = models.CharField(max_length=500)
    image = models.ImageField(null=True, blank=True)


admin.site.register(Post)
