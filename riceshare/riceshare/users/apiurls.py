# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
	url(
        regex=r'^$',
        view=views.user_list,
        name='users_list'
    ),

    url(
    	regex=r'^login$',
    	view=views.login,
    	name='user_login'
    ),

    url(
    	regex=r'^(?P<pk>[0-9]+)/$', 
    	view=views.user_detail,
    	name='user_detail'
    ),
]