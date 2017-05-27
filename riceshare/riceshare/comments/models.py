from django.db import models
from riceshare.users.models import User
from riceshare.post.models import Post

class Comment(models.Model):
    user = models.ForeignKey(User)
    post = models.ForeignKey(Post)
    image = models.ImageField(null = True, blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    liked_users = models.ManyToManyField(User, blank = True, null = True, related_name = 'comment_liked_users')
    num_liked_users = models.IntegerField(default = 0)
    text = models.CharField(max_length = 500)
    #children = models.ForeignKey('self', related_name = 'children', null = True)
