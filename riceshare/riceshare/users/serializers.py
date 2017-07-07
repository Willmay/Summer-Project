from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name', 'photo', 'location', 'background', 'short_description', 'id')
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