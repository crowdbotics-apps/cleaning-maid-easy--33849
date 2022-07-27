from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
                       UserViewSet,
                       UsersListViewSet,
                       CreateCustomerViewSet,
                       CustomersListViewSet,
                       CreateEmployeeViewSet,
                       EmployeesListViewSet,
                       ChangeEmployeeTeamViewSet
                       )

router = DefaultRouter()

router.register("user_info", UserViewSet, basename="user")
router.register("create_customer", CreateCustomerViewSet, basename="create_customer")
router.register("create_employee", CreateEmployeeViewSet, basename="create_employee")
router.register("change_employee_team", ChangeEmployeeTeamViewSet, basename="change_employee_team")

urlpatterns = [
    path("", include(router.urls)),
    path('users_list/', UsersListViewSet.as_view(), name="users_list"),
    path('customers_list/', CustomersListViewSet.as_view(), name="customers_list"),
    path('employees_list/', EmployeesListViewSet.as_view(), name="employees_list"),
]
