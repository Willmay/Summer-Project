# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.post_home,
        name='post_home'
    ),
    url(
        regex=r'^~like/(?P<post_id>[\w.@+-]+)/$',
        view=views.post_like,
        name='post_like'
    ),
    url(
        regex=r'^~unlike/(?P<post_id>[\w.@+-]+)/$',
        view=views.post_unlike,
        name='post_unlike'
    ),
]
