from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.core.validators import FileExtensionValidator


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    company_name = models.CharField(max_length=256, null=True, blank=True)
    display_company = models.BooleanField(null=True)
    address = models.CharField(max_length=500, null=True, blank=True)
    zip_code = models.CharField(max_length=500, null=True, blank=True)
    phone_number = models.CharField(max_length=256, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="group_media/",
                                  validators=[FileExtensionValidator(['jpg', 'png', 'jpeg'])],
                                  null=True,
                                  blank=True)

    user_type = models.CharField(max_length=256, choices=(
        ('Admin', 'Admin'),
        ('Employee', 'Employee'),
        ('Client', 'Client'),
    ), null=True, blank=True)

    service = models.ForeignKey('operations.Service', on_delete=models.SET_NULL, null=True, blank=True)
    frequency = models.ForeignKey('operations.Frequency', on_delete=models.SET_NULL, null=True, blank=True)

    other = models.TextField(null=True, blank=True)

    notifications_enabled = models.BooleanField(null=True)

    assigned_team = models.ForeignKey('operations.Team', on_delete=models.SET_NULL, null=True, blank=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
