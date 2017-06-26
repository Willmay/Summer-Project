from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.template import RequestContext
from .forms import PostSearchForm, UserSearchForm
from haystack.generic_views import SearchView
from riceshare.post.models import Post
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from riceshare.users.serializers import UserSerializer


def index(request):
    return HttpResponse("Hello world!")


# another method for searching in view.py
# def searchUsers(request):
#     """
#     View function for searching all site content.
#     The form class takes care of querying, filtering, and ordering.
#     """
#     form = PostSearchForm(request.GET)
#     sq = form.search()
#     serializer = UserSerializer(sq, many=True)
#
#     return JsonResponse(serializer.data, safe=False)


class PostSearchView(SearchView):
    template_name = 'search/search_posts.html'
    form_class = PostSearchForm
    form_name = 'searchposts_form'
    load_all = False

    def get_queryset(self):
        queryset = super(PostSearchView, self).get_queryset()
        # further filter queryset based on some set of criteria

        return queryset.order_by('-created_at')

    # add extra context
    def get_context_data(self, *args, **kwargs):
        context = super(PostSearchView, self).get_context_data(*args, **kwargs)

        # do something
        context.update({
            'result_num': self.queryset.count(),
        })

        return context


class UserSearchView(SearchView):
    template_name = 'search/search_users.html'
    form_class = UserSearchForm
    form_name = 'searchusers_form'
    load_all = False

    def get_queryset(self):
        queryset = super(UserSearchView, self).get_queryset()

        return queryset.order_by('-created_at')

    def get_context_data(self, *args, **kwargs):
        context = super(UserSearchView, self).get_context_data(*args, **kwargs)

        context.update({
            'result_num': self.queryset.count(),
        })

        return context
