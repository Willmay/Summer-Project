from django.db import models
from riceshare.post.models import Post

class Search(models.Model):
    search = models.ManytoManyField(Post)
    keyword = models.CharField(max_length = 500)
