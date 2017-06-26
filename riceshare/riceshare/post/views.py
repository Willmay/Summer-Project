from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from riceshare.post.forms import PostForm
from riceshare.post.models import Post
from .serializers import PostSerializer
from riceshare.seller.models import Seller
from riceshare.users.models import User
from riceshare.comments.models import Comment

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from django.views.decorators.csrf import csrf_exempt


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


def post_like(request, post_id):
    if request.method == 'GET':
        user = request.user
        post = Post.objects.get(id=post_id)
        if user not in post.liked_users.all():
            post.liked_users.add(user)
            post.num_liked_users = post.num_liked_users + 1
            post.save()
        return redirect("post:post_home")


def post_unlike(request, post_id):
    if request.method == 'GET':
        user = request.user
        post = Post.objects.get(id=post_id)
        if user in post.liked_users.all():
            post.liked_users.remove(user)
            post.num_liked_users = post.num_liked_users - 1
            post.save()
        return redirect("post:post_home")


def post_list(request):
    """
    List all posts, or create a new post.
    """
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        print(data['user'])
        serializer = PostSerializer(data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


def post_detail(request, pk):
    """
    Retrieve, update or delete a post.
    """
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        post.delete()
        return HttpResponse(status=204)
