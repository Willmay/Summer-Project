# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.core.urlresolvers import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages

from django.http import HttpResponse
from django.shortcuts import render, redirect

from django.http import HttpResponse
from django.shortcuts import render, redirect

from .models import User


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

    fields = ['name', 'photo', 'location', 'background', 'short_description', ]

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


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ece8589e78cdeb7205151eec62b84c646e5120cb
def list_all_user(request):
    users = User.objects.all()
    return render(request, 'users/user_list.html', {'user_list': users})


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
<<<<<<< HEAD
        if request.method == 'GET':
            user = User.objects.get(username=username)
            request.user.saved_users.remove(user)
            request.user.save()
            if request.GET.get('redirect_url'):
                return redirect(request.GET.get('redirect_url'))
            else:
                return redirect(user.get_absolute_url())
>>>>>>> b13a77439a1b34654b817034129f5145e61bebc3
=======
    if request.method == 'GET':
        user = User.objects.get(username=username)
        request.user.saved_users.remove(user)
        request.user.save()
        messages.success(request, 'Unfollowed ' + str(user))
        if request.GET.get('redirect_url'):
            return redirect(request.GET.get('redirect_url'))
        else:
            return redirect(user.get_absolute_url())
>>>>>>> ece8589e78cdeb7205151eec62b84c646e5120cb
