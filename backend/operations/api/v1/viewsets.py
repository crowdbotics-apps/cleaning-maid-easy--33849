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
    BriefAppointmentSerializer,
    NotificationSerializer
)
from operations.models import (
    Note,
    Team,
    Frequency,
    Service,
    Appointment,
    Notification,
    TeamMembershipRecord
)

from users.models import User
from users.api.v1.serializers import BriefUserSerializer
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

    def list(self, request, *args, **kwargs):
        all_teams = Team.objects.all()

        try:
            request_date = self.request.GET.get('request_date')
        except:
            request_date = None

        if request_date is None:
            return Response(TeamSerializer(all_teams, many=True).data)

        result = []

        for team in all_teams:
            member_list = []

            team_memberships = TeamMembershipRecord.objects.filter(team=team,
                                                                   record_date__date=request_date,
                                                                   is_joining=False)
            for member in team.team_members.all():
                if len(team_memberships.filter(member=member)) <= 0:
                    member_list.append(BriefUserSerializer(member).data)

            result.append({
                'id': team.id,
                'title': team.title,
                'team_members': member_list
            })

        return Response(result)

    def destroy(self, request, *args, **kwargs):
        team = self.get_object()
        unassigned_team = Team.objects.filter(title__icontains="Unassigned")
        if len(unassigned_team) > 0:
            unassigned_team = unassigned_team.first()
        else:
            unassigned_team = Team.objects.create(title="Unassigned")
        for member in team.team_members.all():
            member.assigned_team = unassigned_team
            member.save()
        team.delete()
        return Response(data='delete success')


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

        duplicate_teams = Team.objects.filter(title=team_name)
        if len(duplicate_teams) > 0:
            return Response({
                'Error': 'A team with this name exists!'
            })

        team = Team.objects.create(
            title=team_name
        )
        for member in members:
            team.team_members.add(member)
            member.assigned_team = team
            member.save()
            #membership = TeamMembershipRecord.objects.create(
            #    member=member,
            #    team=team,
            #    is_joining=True
            #)

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

        #try:
        #    change_date = request.data['change_date']
        #except:
        #    change_date = None

        team.team_members.add(*members)
        for member in members:
            if member.assigned_team:
                member.assigned_team.team_members.remove(member)
                #canceled_membership = TeamMembershipRecord.objects.create(
                #    member=member,
                #    team=member.assigned_team,
                #    is_joining=False
                #)
                #if change_date:
                #    canceled_membership.record_date = change_date
                #    canceled_membership.save()

            member.assigned_team = team
            member.save()

            #membership = TeamMembershipRecord.objects.create(
            #    member=member,
            #    team=team,
            #    is_joining=True
            #)
            #if change_date:
            #    membership.record_date = change_date
            #    membership.save()

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

        try:
            day_off = request.data['day_off']
        except:
            day_off = None

        if day_off:
            for member in members:
                membership = TeamMembershipRecord.objects.create(
                    record_date=day_off,
                    member=member,
                    team=team,
                    is_joining=False
                )
        else:
            team.team_members.remove(*members)
            unassigned_team = Team.objects.filter(title__icontains="Unassigned")
            if len(unassigned_team) > 0:
                unassigned_team = unassigned_team.first()
            else:
                unassigned_team = Team.objects.create(title="Unassigned")

            for member in members:
                member.assigned_team = unassigned_team
                member.save()
                membership = TeamMembershipRecord.objects.create(
                    member=member,
                    team=team,
                    is_joining=False
                )

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
    serializer_class = AppointmentSerializer
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
        return Response(AppointmentSerializer(appointments, many=True).data)


class RangeCalendarViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Appointment.objects.all()

    http_method_names = ["get"]

    def list(self, request):
        try:
            date_from = self.request.GET.get('date_from')
        except:
            date_from = None

        try:
            date_to = self.request.GET.get('date_to')
        except:
            date_to = None

        if not date_from:
            return Response({
                'Error': "Please Specify the Date from."
            }, 400)

        if not date_to:
            return Response({
                'Error': "Please Specify the Date to."
            }, 400)

        appointments = Appointment.objects.filter(appointment_date__range=[date_from, date_to],
                                                  status="Accepted")
        return Response(AppointmentSerializer(appointments, many=True).data)


class NotificationListViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PendingRequestListPagination
    queryset = Notification.objects.all()

    def get_queryset(self, *args, **kwargs):
        return Notification.objects.filter(to_user=self.request.user).order_by('-created_at')


class ReadNotificationViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Notification.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            notification_id = request.data['id']
        except:
            return Response({
                'Error': "Please Specify notification ID."
            }, 400)

        try:
            notification = Notification.objects.get(id=notification_id)
        except:
            return Response({
                'Error': "Invalid ID."
            }, 400)

        notification.is_read = True
        notification.save()

        return Response(NotificationSerializer(notification).data)


class ReplyNotificationViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Notification.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            notification_id = request.data['id']
        except:
            return Response({
                'Error': "Please Specify notification ID."
            }, 400)

        try:
            notification = Notification.objects.get(id=notification_id)
        except:
            return Response({
                'Error': "Invalid ID."
            }, 400)

        try:
            content = request.data['content']
        except:
            return Response({
                'Error': "Please Specify content."
            }, 400)

        new_note = Note.objects.create(
            title=notification.content,
            description=content
        )
        notification.notes.add(new_note)

        return Response(NotificationSerializer(notification).data)
