# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.

    name = models.CharField(_('Name of User'), blank=True, max_length=55)
<<<<<<< HEAD
    photo = models.ImageField(_('Photo of User'), upload_to='./user_pic', blank=True, null=True)
    location = models.CharField(_('Location of User'), blank=True, max_length=255)
    background = models.ImageField(_('Background of User'), upload_to='./user_bac', blank=True, null=True)
    short_description = models.TextField(_('Brief Introduction'), blank=True, max_length=500)
    
    saved_users = models.ManyToManyField("self", null=True, symmetrical=False)  # user who you follow
=======
    photo = models.ImageField(_('Profile photo'), upload_to='./user_pic', blank=True, null=True)
    background = models.ImageField(_('Profile background'), upload_to='./user_bac', blank=True, null=True)
    location = models.CharField(_('Where do you currently live?'), blank=True, max_length=255)
    latitude = models.CharField(blank = True,default='00', max_length = 100)
    longtitude = models.CharField(blank = True, default='00', max_length = 100)
    geohash = models.CharField(blank = True, default = "###", max_length = 20 )
    home = models.CharField(_('Where are you from?'), blank=True, max_length=255)
    short_description = models.TextField(_('Profile introduction'), blank=True, max_length=500)
    saved_users = models.ManyToManyField("self", null=True)  # user who you follow
>>>>>>> 068e2552f46fc0ca2ab612ae351ef9e5139894ea

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})

    def get_photo_url(self):
        try:
            return self.photo.url
        except ValueError:
            return 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg'

    def get_background_url(self):
        try:
            return self.background.url
        except ValueError:
            return 'http://www.planwallpaper.com/static/images/Seamless-Polygon-Backgrounds-Vol2-full_Kfb2t3Q.jpg'

    def get_name(self):
            return self.get_full_name()
