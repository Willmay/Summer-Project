from django import forms
from .models import Post
from haystack.forms import ModelSearchForm


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post', 'image']
        labels = {'post': 'post', 'image': 'image'}
        widgets = {
            'post': forms.Textarea(attrs={'cols': 80, 'rows': 2, 'placeholder': "What's on your mind?"}),
        }


class CustomSearchForm(ModelSearchForm):
    user = forms.CharField(required=False)

    def search(self):
        # First, store the SearchQuerySet received from other processing.
        sqs = super(CustomSearchForm, self).search()

        if not self.is_valid():
            return self.no_query_found()

        if self.cleaned_data['user']:
            sqs = sqs.filter(author=self.cleaned_data['user'])

        return sqs
