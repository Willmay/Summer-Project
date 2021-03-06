# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets


apirouter = [
    url(r'^users/', include('riceshare.users.apiurls')),
    url(r'^posts/', include('riceshare.post.apiurls')),
]

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='pages/home.html'), name='home'),
    url(r'^react/', TemplateView.as_view(template_name='index.html'), name='index'),
    url(r'^about/$', TemplateView.as_view(template_name='pages/about.html'), name='about'),

    url(r'^contract/$', TemplateView.as_view(template_name='seller_contract.html'), name='contract'),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, admin.site.urls),

    # User management
    url(r'^users/', include('riceshare.users.urls', namespace='users')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^post/', include('riceshare.post.urls', namespace='post')),
    url(r'^seller/', include('riceshare.seller.urls', namespace='seller')),
    url(r'^comments/', include('riceshare.comments.urls', namespace='comments')),


    # Rest-api
    url(r'^api/v1/', include(apirouter)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^haystack/basic/', include('haystack.urls')),
    url(r'^search/', include('riceshare.search.urls', namespace='search')),
    # url(r'^search/custom_search/', MySearchView.as_view(), name='search_view'),


    # Your stuff: custom urls includes go here


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns

