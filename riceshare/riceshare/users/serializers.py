from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'photo', 'location', 'background', 'short_description', 'saved_users', 'id', 'pk')
