from django.contrib import admin
from .models import (
    Note,
    Team,
    Frequency,
    Service,
    Appointment
)
# Register your models here.

admin.site.register(Note)
admin.site.register(Team)
admin.site.register(Frequency)
admin.site.register(Service)
admin.site.register(Appointment)
