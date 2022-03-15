from rest_framework import authentication, status
from .serializers import (
                            BriefUserSerializer,
                            UserInfoSerializer
                        )
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
    http_method_names = ["get", "patch"]

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

        return users_query
