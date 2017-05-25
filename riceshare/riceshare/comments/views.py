from django.db.models import Q

from django.http import HttpResponse
from django.shortcuts import render, redirect
from riceshare.comments.forms import CommentForm
from riceshare.post.models import Post
from riceshare.users.models import User
from riceshare.comments.models import Comment

def comment(request, post_id):
	comment_form = CommentForm(request.POST or None, request.FILES or None)
	if request.method == 'POST':		
		if comment_form.is_valid():
			comment = Comment(user = request.user, text = comment_form.cleaned_data['text'], post = Post.objects.get(id = post_id), image = comment_form.cleaned_data['image'])
			comment.save()
		return redirect("comments:comment", post_id) 
	else:
		comment_form = CommentForm()
		user = request.user
		post = Post.objects.get(id = post_id)
		comments = Comment.objects.filter(Q(user = user) & Q(post = post))
		comments = comments.distinct().order_by('-created_at')
		return render(request, "comments/thread.html", context = {"comments": comments, "post_id": post_id, "comment_form": comment_form})

