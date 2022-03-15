from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
                       PasswordResetRequestViewSet,
                       VerifyResetTokenViewSet,
                       ConfirmPasswordResetViewSet,
                       UserViewSet,
                       UsersListViewSet,
                       AddUserToNetworkViewSet,
                       NetworkRequestActionViewSet,
                       CreateGroupViewSet,
                       AddToGroupViewSet,
                       MyNetworkGroupsViewSet,
                       AllNetworkGroupsViewSet,
                       FlagUserViewSet,
                       MyGroupsRequestViewSet,
                       MyNetworkRequestViewSet,
                       GroupRequestActionViewSet,
                       EmailTestViewSet
                       )

router = DefaultRouter()

router.register("user_info", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
]
