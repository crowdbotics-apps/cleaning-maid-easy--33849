from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
                       UserViewSet,
                       UsersListViewSet
                       )

router = DefaultRouter()

router.register("user_info", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path('users_list/', UsersListViewSet.as_view(), name="users_list"),
]
