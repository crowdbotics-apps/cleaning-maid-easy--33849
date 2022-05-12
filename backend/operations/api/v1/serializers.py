from rest_framework import serializers
from operations.models import Note, Team, Frequency, Service, Appointment, Notification
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
            'client_address',
            'client_number',
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


class BriefAppointmentSerializer(serializers.ModelSerializer):
    client = BriefUserSerializer(read_only=True)
    assigned_team = TeamSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    frequency = FrequencySerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = (
            'id',
            'title',
            'appointment_date',
            'start_time',
            'end_time',
            'client',
            'assigned_team',
            'service',
            'frequency',
            'status',
            'created_at',
            'updated_at',
        )


class ClientAppointmentSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    frequency = FrequencySerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = (
            'id',
            'appointment_date',
            'service',
            'frequency',
            'price'
        )


class CustomerSerializer(serializers.ModelSerializer):
    service_history = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'email',
            'address',
            'zip_code',
            'phone_number',
            'company',
            'service_history',
            'service',
            'other',
            'notifications_enabled'
        )

    def get_service_history(self, obj):
        appointments = Appointment.objects.filter(client=obj)
        return ClientAppointmentSerializer(appointments, many=True).data

    def get_company(self, obj):
        if obj.display_company:
            return obj.company_name
        else:
            return "/"


class EmployeeSerializer(serializers.ModelSerializer):
    assigned_team = TeamSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'address',
            'zip_code',
            'company_name',
            'display_company',
            'phone_number',
            'assigned_team',
        )


class NotificationSerializer(serializers.ModelSerializer):
    from_user = BriefUserSerializer(read_only=True)
    to_user = BriefUserSerializer(read_only=True)
    notes = NoteSerializer(many=True)

    class Meta:
        model = Notification
        fields = '__all__'
