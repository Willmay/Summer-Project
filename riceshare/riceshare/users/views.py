# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from cmath import acos, cos, sin
from math import radians

from django.core.urlresolvers import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView
from django.contrib.auth.hashers import make_password, is_password_usable, check_password

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.contrib.auth import authenticate

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

from .geohash import StaticVariable
from .geohash import GeoHash

from django.views.decorators.csrf import csrf_exempt


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})


class UserUpdateView(LoginRequiredMixin, UpdateView):

    fields = ['name', 'photo', 'background', 'location', 'home', 'short_description', ]

    # we already imported User in the view code above, remember?
    model = User

    # send the user back to their own page after a successful update
    def get_success_url(self):
        return reverse('users:detail',
                       kwargs={'username': self.request.user.username})

    def get_object(self):
        # Only get the User record for the user making the request
        return User.objects.get(username=self.request.user.username)


class UserListView(LoginRequiredMixin, ListView):
    model = User
    # These next two lines tell the view to index lookups by username
    slug_field = 'username'
    slug_url_kwarg = 'username'

@csrf_exempt
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def login(request):
    u = User.objects.get(username = request.data.get('username'))
    serializer = UserSerializer(u)
    print(serializer.data, request.data.get('password'), request.data.get('password')==u.password)
    if request.data.get('password')==u.password:
        return Response(serializer.data)
    else:
        return HttpResponse(status=403)



@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def user_list(request):
    """
    List all users, or create a new unser.
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            """
            password = make_password(request.data.get('password'))
            u = User.objects.get(username = request.data.get('username'))
            if is_password_usable(password):    
                u.set_password(password)
                u.save()
            """
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def list_all_user(request):
    users = User.objects.all()
    return render(request, 'users/user_list.html', {'user_list': users})

@csrf_exempt
def user_detail(request, pk):
    """
    Retrieve, update or delete a user.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)


def list_all_follower(request):
    user = request.user
    followers = user.saved_users.all()
    return render(request, 'users/follower_list.html', {'follower_list': followers})


def follow(request, username):
    if request.method == 'GET':
        user = User.objects.get(username=username)
        request.user.saved_users.add(user)
        request.user.save()
        messages.success(request, 'Following ' + str(user))
        if request.GET.get('redirect_url'):
            return redirect(request.GET.get('redirect_url'))
        else:
            return redirect(user.get_absolute_url())


def unfollow(request, username):
    if request.method == 'GET':
        user = User.objects.get(username=username)
        request.user.saved_users.remove(user)
        request.user.save()
        messages.success(request, 'Unfollowed ' + str(user))
        if request.GET.get('redirect_url'):
            return redirect(request.GET.get('redirect_url'))
        else:
            return redirect(user.get_absolute_url())

def updateLocation(request):
    if request.method == 'GET':
        user = request.user
        latitude = request.GET['latitude']
        longtitude = request.GET['longtitude']
        print("latitude" + latitude)
        print("longtitude" + longtitude)
        print("user before latitude" + user.latitude)
        if user.latitude != latitude or user.longtitude != longtitude:
            user.longtitude = longtitude
            user.latitude =latitude
            user.geohash = GeoHash().encode(float(latitude), float(longtitude), 12)
            user.save()
            print("user new latitude" + user.latitude)
        return redirect("post:post_home")

def findNearest(request):
    if request.method == 'GET':
        user = request.user
        geo_string = user.geohash[:5]
        print("********************************************************")
        print(geo_string)
        users_neareast = User.objects.filter(geohash__startswith = geo_string)
        return render(request, 'post/users_nearest.html', {'users_neareast': users_neareast})
    else:
        return HttpResponse("nearest location failed")


