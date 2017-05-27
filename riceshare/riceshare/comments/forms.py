from django import forms

from .models import Comment

class CommentForm(forms.ModelForm):
	class Meta:
		model = Comment
		fields = ['text', 'image']
		labels = {'text' : 'text', 'image': 'image'}
		widgets = {
			'text': forms.Textarea(attrs={'cols': 80, 'rows': 2, 'placeholder': "What's on your mind?"}),
		}

