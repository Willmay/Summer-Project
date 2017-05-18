from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.post.forms import PostForm
from riceshare.post.models import Post


def post_home(request):
    post_form = PostForm(request.POST or None, request.FILES or None)
    context = {}
    if request.method == "POST":
        if post_form.is_valid():
            post = Post(user=request.user, post=post_form.cleaned_data['post'], image=post_form.cleaned_data['image'])
            post.save()
            context.update({
                "post_form": post_form,
            })
            return redirect("post:post_home")
    else:

        post_form = PostForm()

        user = request.user
        saved_users = user.saved_users.all()
        follower_count = user.saved_users.count()
        posts = set()
        for post in user.post_set.all():
            posts.add(post)
        if saved_users.exists():
            for user in saved_users:
                for post in user.post_set.all():
                    posts.add(post)
        return render(request, "post/post_home.html", context={"post_form": post_form, "posts": posts,
                                                               "follower_count": follower_count})
