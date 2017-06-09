# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^(?P<post_id>[\w.@+-]+)/$',
        view=views.comment,
        name='comment'
    ),
]
