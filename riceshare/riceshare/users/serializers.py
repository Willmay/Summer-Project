from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'name', 'photo', 'location', 'background', 'home', 'short_description',
            'id')

    """
	email = serializers.EmailField(
		    required=True,
		    validators=[UniqueValidator(queryset=User.objects.all())]
		)
	username = serializers.CharField(
		    required=True,
		    validators=[UniqueValidator(queryset=User.objects.all())]
		)
	password = serializers.CharField(min_length=8)

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
		return user
	"""


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'photo', 'id', 'pk')


class ProfileReadSerializer(serializers.ModelSerializer):
    saved_users = FollowingSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'username', 'name', 'photo', 'location', 'background', 'home', 'short_description', 'saved_users', 'id',
            'pk')


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'name', 'photo', 'location', 'background', 'home', 'short_description', 'id', 'pk')
