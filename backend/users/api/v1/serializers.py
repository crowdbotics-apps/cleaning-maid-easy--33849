from rest_framework import serializers
from users.models import User


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class BriefUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                  'name',
                  'profile_media',
                  'is_profile_media_video',
                  ]
