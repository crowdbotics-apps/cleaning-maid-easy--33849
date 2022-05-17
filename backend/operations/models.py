from django.db import models

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()

    def __str__(self):
        return self.title


class Team(models.Model):
    title = models.CharField(max_length=256)
    team_members = models.ManyToManyField('users.User', blank=True)

    def __str__(self):
        return self.title


class TeamMembershipRecord(models.Model):
    record_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    member = models.ForeignKey('users.User', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    is_joining = models.BooleanField(default=False)

    def __str__(self):
        return self.member.name + " - " + self.team.title + " - " + str(self.record_date)


class Frequency(models.Model):
    title = models.CharField(max_length=256)
    color_code = models.CharField(max_length=256)

    def __str__(self):
        return self.title


class Service(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name


class Appointment(models.Model):
    title = models.CharField(max_length=256)
    appointment_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    client = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)
    client_name = models.CharField(max_length=256, null=True, blank=True)
    client_address = models.CharField(max_length=256, null=True, blank=True)
    client_number = models.CharField(max_length=256, null=True, blank=True)
    assigned_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    frequency = models.ForeignKey(Frequency, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )
    description = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    status = models.CharField(max_length=256, null=True, blank=True,
                              choices=(
                                  ('Pending', 'Pending'),
                                  ('Accepted', 'Accepted'),
                                  ('Rejected', 'Rejected'),
                              ))

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.assigned_team:
                for member in self.assigned_team.team_members.all():
                    Notification.objects.create(
                        to_user=member,
                        content="You have been assigned a new appointment named {0} on {1} from {2} to {3} .".format(
                            self.title, self.appointment_date, self.start_time, self.end_time
                        )
                    )

        super(Appointment, self).save(*args, **kwargs)


class Notification(models.Model):
    from_user = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="from_user"
    )
    to_user = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="to_user"
    )
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    notes = models.ManyToManyField(Note, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

