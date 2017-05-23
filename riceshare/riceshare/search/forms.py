from django import forms
from .models import Search

class SearchForm(forms.ModelForm):
    class Meta:
        model = Search
        fields = ['keyword']
        labels = {'keyword' : 'keyword'}
        widgets = {'keyword' : forms.Textarea(attrs={'cols':80, 'rows': 5, 'placeholder': Search}),
                   }
