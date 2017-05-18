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
    photo = models.ImageField(_('Photo of User'), upload_to='./user_pic', blank=True, null=True)
    location = models.CharField(_('Location of User'), blank=True, max_length=255)
    background = models.ImageField(_('Background of User'), upload_to='./user_bac', blank=True, null=True)
    short_description = models.TextField(_('Brief Introduction'), blank=True, max_length=500)

    saved_users = models.ManyToManyField("self", null=True)  # user who you follow

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
