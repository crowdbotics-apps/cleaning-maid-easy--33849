from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    TermsAndConditionsViewSet,
    PrivacyPolicyViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("terms_and_conditions", TermsAndConditionsViewSet)
router.register("privacy_policy", PrivacyPolicyViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
