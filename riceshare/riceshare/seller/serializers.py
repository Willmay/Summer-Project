from rest_framework import serializers
from .models import Seller

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ('user', 'introduction', 'evaluation', 'goal', 'chef_type', 'chef_experience', 'cuisine_type', 'id', 'pk')
