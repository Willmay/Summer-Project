# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.register,
        name='register'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/$',
        view=views.home,
        name='detail'
    ),

]
