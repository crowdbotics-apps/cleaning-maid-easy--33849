from django.urls import path, include
from rest_framework.routers import DefaultRouter

from operations.api.v1.viewsets import (
    NoteViewSet,
    ServiceViewSet,
    FrequencyViewSet,
    AppointmentViewSet,
    TeamViewSet,
    CreateTeamViewSet,
    AddTeamMemberViewSet,
    RemoveTeamMemberViewSet,
    PendingRequestListViewSet,
    PendingRequestActionViewSet,
    DayCalendarViewSet,
    NotificationListViewSet,
    ReadNotificationViewSet,
    ReplyNotificationViewSet
)

router = DefaultRouter()
router.register("notes", NoteViewSet)
router.register("services", ServiceViewSet)
router.register("frequency", FrequencyViewSet)
router.register("appointment", AppointmentViewSet)
router.register("teams", TeamViewSet)
router.register("create_team", CreateTeamViewSet, basename="create_team")
router.register("add_team_member", AddTeamMemberViewSet, basename="add_team_member")
router.register("remove_team_member", RemoveTeamMemberViewSet, basename="remove_team_member")
router.register("request_action", PendingRequestActionViewSet, basename="request_action")
router.register("day_calendar", DayCalendarViewSet, basename="day_calendar")
router.register("read_notification", ReadNotificationViewSet, basename="read_notification")
router.register("reply_notification", ReplyNotificationViewSet, basename="reply_notification")


urlpatterns = [
    path("", include(router.urls)),
    path('pending_requests/', PendingRequestListViewSet.as_view(), name="pending_requests"),
    path('notifications/', NotificationListViewSet.as_view(), name="notifications"),
]
