from django import forms
from .models import Seller
from riceshare.users.models import User


class SellerForm(forms.ModelForm):
    class Meta:
        model = Seller
        fields = ['introduction', 'goal', 'chef_type', 'chef_experience', 'cuisine_type']
        labels = {
            'introduction': 'Give a brief introduction about yourself.',
            'goal': 'Why do you want to be a chef?',
            'chef_type': 'What types of chef you want to be?',
            'chef_experience': 'How do you evaluate your cooking experience?',
            'cuisine_type': 'What cuisine type do your prefer to cook?',
        }


class UserForm(forms.ModelForm):
    class Meta:
        model = User

        fields = ['name', 'photo', 'location', 'short_description']
