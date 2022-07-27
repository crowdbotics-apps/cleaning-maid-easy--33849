from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from home.models import TermsAndConditions, PrivacyPolicy

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    TermsAndConditionsSerializer,
    PrivacyPolicySerializer

)


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class TermsAndConditionsViewSet(ModelViewSet):
    queryset = TermsAndConditions.objects.all()
    serializer_class = TermsAndConditionsSerializer
    http_method_names = ["get"]

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if pk == "latest":
            return Response(TermsAndConditionsSerializer(TermsAndConditions.objects.all().last()).data)
        return super(TermsAndConditionsViewSet, self).retrieve(request, pk)


class PrivacyPolicyViewSet(ModelViewSet):
    queryset = PrivacyPolicy.objects.all()
    serializer_class = PrivacyPolicySerializer
    http_method_names = ["get"]

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if pk == "latest":
            return Response(PrivacyPolicySerializer(PrivacyPolicy.objects.all().last()).data)
        return super(PrivacyPolicyViewSet, self).retrieve(request, pk)