from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.post.forms import PostForm
from riceshare.post.models import Post


def index(request):
    return HttpResponse("Hello world!")

def create_post(request):
    if request.method == "POST":
        post_form = PostForm(request.POST)
        if post_form.is_valid():
            post = Post(user = request.user, post = post_form.cleaned_data['post'])
            post.save()
            return HttpResponse("Post Successuflly")
        else:
            return HttpResponse("Post has an error")
    else:
        post_form = PostForm()
        return render(request, "post/create_post.html", context = {"post_form" : post_form})
