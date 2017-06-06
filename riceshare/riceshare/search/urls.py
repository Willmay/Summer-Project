# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url
from . import views
from .views import search


urlpatterns = [
    url(
        regex=r'^$',
        view=search,
        name='post_search'
    ),

    url(
        regex=r'^~post_results/$',
        view=views.PostSearchView.as_view(),
        name='post_results'
    ),

    url(
        regex=r'^~user_results/$',
        view=views.UserSearchView.as_view(),
        name='user_results'
    )
]
