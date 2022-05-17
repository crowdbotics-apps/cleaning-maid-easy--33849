from rest_framework import authentication, status
from .serializers import (
                            BriefUserSerializer,
                            UserInfoSerializer,
                        )
from operations.api.v1.serializers import CustomerSerializer, EmployeeSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
import datetime as dt
import random as r
from django.core.mail import send_mail
from allauth.utils import email_address_exists, generate_unique_username
from operations.models import Service, Frequency, Team

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    parser_classes = (MultiPartParser,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "patch", "delete"]

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user and pk == "me":
            return Response(UserInfoSerializer(request.user).data)
        return super(UserViewSet, self).retrieve(request, pk)


class UsersListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class UsersListViewSet(generics.ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = BriefUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UsersListPagination
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):

        try:
            q = self.request.GET.get('q')
        except:
            q = None

        users_query = User.objects.all()

        if q:
            users_query = users_query.filter(name__icontains=q)

        try:
            user_type = self.request.GET.get('user_type')
        except:
            user_type = None

        try:
            un_assigned = self.request.GET.get('un_assigned')
        except:
            un_assigned = None

        if user_type:
            users_query = users_query.filter(user_type=user_type)

        if un_assigned:
            unassigned_team = Team.objects.filter(title__icontains="Unassigned")
            if len(unassigned_team) > 0:
                unassigned_team = unassigned_team.first()
            else:
                unassigned_team = Team.objects.create(title="Unassigned")
            users_query = users_query.filter(assigned_team=unassigned_team)

        return users_query


class CreateCustomerViewSet(ViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = UserInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            name = request.data['name']
        except:
            return Response({
                'Error': 'Invalid Name.'
            }, 400)

        try:
            email = request.data['email']
        except:
            return Response({
                'Error': 'Invalid Email.'
            }, 400)

        if email and email_address_exists(email):
            return Response({
                'Error': 'User with this email already exists.'
            }, 400)

        try:
            company_name = request.data['company_name']
        except:
            company_name = None

        try:
            phone_number = request.data['phone_number']
        except:
            return Response({
                'Error': 'Invalid Phone Number.'
            }, 400)

        try:
            zip_code = request.data['zip_code']
        except:
            return Response({
                'Error': 'Invalid Zip Code.'
            }, 400)

        try:
            address = request.data['address']
        except:
            return Response({
                'Error': 'Invalid Address.'
            }, 400)

        try:
            service_id = request.data['service_id']
        except:
            return Response({
                'Error': 'Invalid Service ID.'
            }, 400)

        try:
            service = Service.objects.get(id=service_id)
        except:
            return Response({
                'Error': 'Invalid Service'
            }, 400)

        try:
            other = request.data['other']
        except:
            other = None

        try:
            freq_id = request.data['freq_id']
        except:
            return Response({
                'Error': 'Invalid Frequency ID.'
            }, 400)

        try:
            freq = Frequency.objects.get(id=freq_id)
        except:
            return Response({
                'Error': 'Invalid Frequency'
            }, 400)

        try:
            notifications = request.data['notifications']
        except:
            notifications = False

        try:
            user = User.objects.create(
                name=name,
                email=email,
                username=generate_unique_username([
                    name,
                    email,
                    'user'
                ]),
                company_name=company_name,
                address=address,
                zip_code=zip_code,
                phone_number=phone_number,
                user_type='Client',
                service=service,
                frequency=freq,
                other=other,
                notifications_enabled=notifications
            )
            return Response(UserInfoSerializer(user).data)
        except:
            return Response({
                'Error': 'Error Creating Customer.'
            }, 400)


class CustomersListViewSet(generics.ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UsersListPagination
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):

        try:
            q = self.request.GET.get('q')
        except:
            q = None

        users_query = User.objects.filter(user_type='Client')

        if q:
            users_query = users_query.filter(name__icontains=q)

        return users_query

    @property
    def paginator(self):
        self._paginator = super(CustomersListViewSet, self).paginator
        if self.request.GET.get('all') == 'true':
            self._paginator = None
            #self.serializer_class = BriefUserSerializer
        return self._paginator


class CreateEmployeeViewSet(ViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            name = request.data['name']
        except:
            return Response({
                'Error': 'Invalid Name.'
            }, 400)

        if name:
            users = User.objects.filter(name=name)
            if len(users) > 0:
                return Response({
                    'Error': 'Employee with same name exists.'
                }, 400)

        try:
            email = request.data['email']
        except:
            return Response({
                'Error': 'Invalid Email.'
            }, 400)

        if email and email_address_exists(email):
            return Response({
                'Error': 'User with this email already exists.'
            }, 400)

        try:
            company_name = request.data['company_name']
        except:
            company_name = None

        try:
            display_company = request.data['display_company']
        except:
            display_company = False

        try:
            phone_number = request.data['phone_number']
        except:
            return Response({
                'Error': 'Invalid Phone Number.'
            }, 400)

        try:
            zip_code = request.data['zip_code']
        except:
            return Response({
                'Error': 'Invalid Zip Code.'
            }, 400)

        try:
            address = request.data['address']
        except:
            return Response({
                'Error': 'Invalid Address.'
            }, 400)


        try:
            team_id = request.data['team_id']
        except:
            team_id = None

        if team_id:
            try:
                team = Team.objects.get(id=team_id)
            except:
                team = None
        else:
            team = None

        try:
            user = User.objects.create(
                name=name,
                email=email,
                username=generate_unique_username([
                    name,
                    email,
                    'user'
                ]),
                company_name=company_name,
                display_company=display_company,
                address=address,
                zip_code=zip_code,
                phone_number=phone_number,
                user_type='Employee',
                assigned_team=team,
            )
            if team is None:
                unassigned_team = Team.objects.filter(title__icontains="Unassigned")
                if len(unassigned_team) > 0:
                    unassigned_team = unassigned_team.first()
                else:
                    unassigned_team = Team.objects.create(title="Unassigned")
                user.assigned_team = unassigned_team
                user.save()
                unassigned_team.team_members.add(user)

            return Response(EmployeeSerializer(user).data)
        except:
            return Response({
                'Error': 'Error Creating Employee.'
            }, 400)


class EmployeesListViewSet(generics.ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = UsersListPagination
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):

        try:
            q = self.request.GET.get('q')
        except:
            q = None

        users_query = User.objects.filter(user_type='Employee')

        if q:
            users_query = users_query.filter(name__icontains=q)

        return users_query


class ChangeEmployeeTeamViewSet(ViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    http_method_names = ["post"]

    def create(self, request):
        try:
            user_id = request.data['employee_id']
            user = User.objects.get(id=user_id)
        except:
            return Response({
                'Error': 'Invalid User ID.'
            }, 400)

        try:
            team_id = request.data['team_id']
        except:
            return Response({
                'Error': 'Please Provide Team ID.'
            }, 400)

        if team_id:
            try:
                team = Team.objects.get(id=team_id)
            except:
                return Response({
                    'Error': 'Invalid Team ID.'
                }, 400)

            team.team_members.add(user)
            user.assigned_team = team
            user.save()
        else:
            if user.assigned_team:
                user.assigned_team.team_members.remove(user)
                user.assigned_team = None
                user.save()

        return Response(EmployeeSerializer(user).data)
