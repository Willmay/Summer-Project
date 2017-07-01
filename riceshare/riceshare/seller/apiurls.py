# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
	url(
        regex=r'^$',
        view=views.become_seller,
        name='become_seller'
    ),

    url(
        regex=r'^list/$',
        view=views.seller_list,
        name='seller_list'
    ),



]