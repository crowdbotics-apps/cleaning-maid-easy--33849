from django.contrib import admin
from .models import TermsAndConditions, PrivacyPolicy
# Register your models here.


admin.site.register(TermsAndConditions)
admin.site.register(PrivacyPolicy)
