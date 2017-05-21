from django.db import models
from riceshare.users.models import User


class Seller(models.Model):
    seller = models.OneToOneField(User)
    description=models.TextField(max_length=255, blank=True)
    evaluation = models.CharField(max_length=255, blank=True)
