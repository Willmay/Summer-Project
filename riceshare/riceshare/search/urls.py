# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url

from haystack.views import SearchView


urlpatterns = [
    url(regex = r'^$',
        view = views.MySearchView(),
        name='haystack_search'),
]
