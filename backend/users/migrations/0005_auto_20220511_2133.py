# Generated by Django 2.2.27 on 2022-05-11 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20220324_1940'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Name of User'),
        ),
    ]
