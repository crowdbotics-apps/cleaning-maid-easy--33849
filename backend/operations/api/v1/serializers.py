from rest_framework import serializers
from operations.models import Note, Team, Frequency, Service, Appointment
from users.api.v1.serializers import BriefUserSerializer
from users.models import User


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    team_members = BriefUserSerializer(many=True)

    class Meta:
        model = Team
        fields = '__all__'


class FrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequency
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    client = BriefUserSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(write_only=True, source='client',
                                                   queryset=User.objects.all(), required=False)

    assigned_team = TeamSerializer(read_only=True)
    assigned_team_id = serializers.PrimaryKeyRelatedField(write_only=True, source='assigned_team',
                                                   queryset=Team.objects.all(), required=False)

    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(write_only=True, source='service',
                                                          queryset=Service.objects.all(), required=False)

    frequency = FrequencySerializer(read_only=True)
    frequency_id = serializers.PrimaryKeyRelatedField(write_only=True, source='frequency',
                                                          queryset=Frequency.objects.all(), required=False)

    class Meta:
        model = Appointment
        fields = (
            'id',
            'title',
            'appointment_date',
            'start_time',
            'end_time',
            'client',
            'client_id',
            'assigned_team',
            'assigned_team_id',
            'service',
            'service_id',
            'frequency',
            'frequency_id',
            'price',
            'description',
            'notes',
            'status',
            'created_at',
            'updated_at',
        )
