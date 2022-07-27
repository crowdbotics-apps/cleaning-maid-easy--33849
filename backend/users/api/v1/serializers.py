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
            "display_company",
            'address',
            'zip_code',
            'service',
            'frequency',
            'email',
            'phone_number',
            'user_type',
            'notifications_enabled',
            'other'
        )


class BriefUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                  'name',
                  'profile_picture',
                  ]
