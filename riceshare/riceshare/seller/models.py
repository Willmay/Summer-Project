from django.db import models
from riceshare.users.models import User

GOAL_CHOICES = (
    ('Earn money', 'Earn money'),
    ('Meet new friends', 'Meet new friends'),
    ('Personal interests', 'Personal interests'),
)

CHEF_TYPE_CHOICES = (
    ('Not sure', 'Not sure'),
    ('Not sure', 'Not sure'),
    ('Not sure', 'Not sure'),
)

CHEF_EXPERIENCE_CHOICES = (
    ('Newbie', 'Newbie'),
    ('Self-taught', 'Self-taught'),
    ('Professional', 'Professional'),
    ('Other', 'Other'),
)

CUISINE_TYPE_CHOICES = (
    ('Asian', 'Asian'),
    ('Mediterranean', 'Mediterranean'),
    ('Mexican', 'Mexican'),
    ('Spanish', 'Spanish'),
    ('American', 'American'),
    ('French', 'French'),
    ('Italian', 'Italian'),
)


class Seller(models.Model):
    seller = models.OneToOneField(User)
    introduction = models.TextField(blank=True, null=True, max_length=255)
    evaluation = models.CharField(blank=True, null=True, max_length=255)
    goal = models.CharField(blank=True, null=True, max_length=30, choices=GOAL_CHOICES)
    chef_type = models.CharField(blank=True, null=True, max_length=20, choices=CHEF_TYPE_CHOICES)
    chef_experience = models.CharField(blank=True, null=True, max_length=20, choices=CHEF_EXPERIENCE_CHOICES)
    cuisine_type = models.CharField(blank=True, null=True, max_length=30, choices=CUISINE_TYPE_CHOICES)
    # dish_photos1 = models.ImageField(blank=True, null=True)
