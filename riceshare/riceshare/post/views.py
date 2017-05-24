from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.post.forms import PostForm
from riceshare.post.models import Post
from riceshare.seller.models import Seller


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
        sellers = Seller.objects.all()
        posts = Post.objects.filter(Q(user__in=saved_users) | Q(user=user))
        posts = posts.distinct().order_by('-created_at')
        return render(request, "post/post_home.html", context={"post_form": post_form, "posts": posts,
                                                               "follower_count": follower_count, 'sellers': sellers})

