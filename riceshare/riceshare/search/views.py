from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.search.utils import get_query
from riceshare.users.models import User


def index(request):
    return HttpResponse("Hello world!")


def searchUser(request):
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        entry_query_user = get_query(query_string, ['username', ])
        found_user_entries = User.objects.filter(entry_query_user)

    return render(request, 'search/search_user.html', context={'query_user': query_string,
                                                               'found_user_entries': found_user_entries})
