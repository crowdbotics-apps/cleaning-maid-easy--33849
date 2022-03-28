from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework import serializers, status
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone

import datetime as dt

from operations.api.v1.serializers import (
    NoteSerializer,
    TeamSerializer,
    FrequencySerializer,
    ServiceSerializer,
    AppointmentSerializer,
    BriefAppointmentSerializer
)
from operations.models import (
    Note,
    Team,
    Frequency,
    Service,
    Appointment
)

from users.models import User
from django.db.models import Q


class NoteViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()


class ServiceViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Service.objects.all()


class TeamViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()


class CreateTeamViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            member_ids = request.data['member_ids']
            members = User.objects.filter(id__in=list(member_ids))
        except:
            return Response({
                'Error': 'Invalid Participants ID.'
            })

        try:
            team_name = request.data['team_name']
        except:
            return Response({
                'Error': 'Invalid Team Name.'
            })

        team = Team.objects.create(
            title=team_name
        )
        for member in members:
            team.team_members.add(member)

        return Response(TeamSerializer(team).data)


class AddTeamMemberViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            member_id = request.data['member_ids']
            members = User.objects.filter(id__in=list(member_id))
        except:
            return Response({
                'Error': 'Invalid Member ID.'
            })

        try:
            team_id = request.data['team_id']
            team = Team.objects.get(id=int(team_id))
        except:
            return Response({
                'Error': 'Invalid Team ID.'
            })

        team.team_members.add(*members)
        for member in members:
            member.assigned_team = team
            member.save()

        return Response(TeamSerializer(team).data)


class RemoveTeamMemberViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            member_id = request.data['member_ids']
            members = User.objects.filter(id__in=list(member_id))
        except:
            return Response({
                'Error': 'Invalid Member ID.'
            })

        try:
            team_id = request.data['team_id']
            team = Team.objects.get(id=int(team_id))
        except:
            return Response({
                'Error': 'Invalid Team ID.'
            })

        team.team_members.remove(*members)

        for member in members:
            member.assigned_team = None
            member.save()

        return Response(TeamSerializer(team).data)


class FrequencyViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = FrequencySerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Frequency.objects.all()


class AppointmentViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Appointment.objects.all()


class PendingRequestListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class PendingRequestListViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PendingRequestListPagination
    queryset = Appointment.objects.all()

    def get_queryset(self, *args, **kwargs):
        return Appointment.objects.filter(status="Pending")


class PendingRequestActionViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Appointment.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            appointment_id = request.data['appointment_id']
            appointment = Appointment.objects.get(id=int(appointment_id))
        except:
            return Response({
                'Error': 'Invalid Appointment ID.'
            })

        try:
            action = request.data['action']
        except:
            return Response({
                'Error': 'Invalid Action ID.'
            })

        if action == "Accept":
            appointment.status = "Accepted"
            appointment.save()
        elif action == "Reject":
            appointment.status = "Rejected"
            appointment.save()

        return Response(AppointmentSerializer(appointment).data)


class DayCalendarViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = BriefAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Appointment.objects.all()

    http_method_names = ["get"]

    def list(self, request):
        try:
            day = self.request.GET.get('day')
        except:
            day = None

        if not day:
            return Response({
                'Error': "Please Specify the Day."
            }, 400)

        appointments = Appointment.objects.filter(appointment_date=day, status="Accepted")
        return Response(BriefAppointmentSerializer(appointments, many=True).data)
