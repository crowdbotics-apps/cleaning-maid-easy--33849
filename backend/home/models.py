from django.db import models
from ckeditor.fields import RichTextField


class TermsAndConditions(models.Model):
    version = models.CharField(max_length=256)
    terms = RichTextField()


class PrivacyPolicy(models.Model):
    version = models.CharField(max_length=256)
    terms = RichTextField()
