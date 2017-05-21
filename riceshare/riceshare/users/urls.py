# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.UserListView.as_view(),
        name='list'
    ),
    url(
        regex=r'^~redirect/$',
        view=views.UserRedirectView.as_view(),
        name='redirect'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/$',
        view=views.UserDetailView.as_view(),
        name='detail'
    ),
    url(
        regex=r'^~update/$',
        view=views.UserUpdateView.as_view(),
        name='update'
    ),
    url(
        regex=r'^~userlist/$',
        view=views.list_all_user,
        name='userlist'
    ),
    url(
        regex=r'^~follow/(?P<username>[\w.@+-]+)/$',
        view=views.follow,
        name='follow'
    ),
    url(
        regex=r'^~unfollow/(?P<username>[\w.@+-]+)/$',
        view=views.unfollow,
        name='unfollow'
    ),
    url(
        regex=r'^~followerlist/$',
        view=views.list_all_follower,
        name='followerlist'
    ),

]
