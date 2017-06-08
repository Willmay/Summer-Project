from django import forms
from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post', 'image']
        labels = {'post': 'post', 'image': 'image'}
        widgets = {
            'post': forms.Textarea(attrs={'cols': 80, 'rows': 2, 'placeholder': "What's on your mind?"}),
        }
