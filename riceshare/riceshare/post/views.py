from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.post.forms import PostForm
from riceshare.post.models import Post


def post_home(request):
    post_form = PostForm(request.POST or None)
    if request.method == "POST":
        if post_form.is_valid():
            post = Post(user=request.user, post=post_form.cleaned_data['post'])
            post.save()
            return HttpResponse("Post Successuflly")
    else:
        post_form = PostForm()
        return render(request, "post/post_home.html", context={"post_form": post_form})



