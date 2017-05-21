from django import forms
from .models import Seller


class SellerForm(forms.ModelForm):
    class Meta:
        model = Seller
        fields = ['description', 'evaluation']
        labels = {'description': 'description', 'evaluation': 'evaluation'}
        widgets = {
            'description': forms.Textarea(attrs={'cols': 80, 'rows': 5, 'placeholder': "nice"}),
            'evaluation': forms.Textarea(attrs={'cols': 80, 'rows': 2, 'placeholder': "something"}),
        }
