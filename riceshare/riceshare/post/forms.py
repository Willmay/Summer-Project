from django import forms

from .models import Post

class PostForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = ['post']
		labels = {'post' : 'post'}
		widgets = {
			'post': forms.Textarea(attrs={'cols': 80, 'rows': 2, 'placeholder': "What's on your mind?"}),
		}

