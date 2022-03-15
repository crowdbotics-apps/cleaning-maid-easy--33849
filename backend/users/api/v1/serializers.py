from rest_framework import serializers
from users.models import User


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'profile_picture',
            'company_name',
            'address',
            'email',
            'phone_number',
            'user_type'
        )


class BriefUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                  'name',
                  'profile_picture',
                  ]
