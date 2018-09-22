from django.db import models
from datetime import datetime
# Create your models here.

class Booking(models.Model):
    date = models.DateField(default=datetime.now, null=True)
    booking_no = models.CharField(max_length=50, blank=True)

    container_no = models.CharField(max_length=50, blank=True)
    seal_no = models.CharField(max_length=50, blank=True)

    closing_date = models.DateField(max_length=20, null=True, blank=True, default=None)

    remark = models.CharField(max_length=200, blank=True)
    work_id = models.CharField(max_length=50, blank=True)
    work_number = models.IntegerField(default=0)


    ADDRESS_CHOICES = (
        ('shipper', 'Shipper'),
        ('other', 'Other'),
        ('none', 'None'),
    )
    address = models.CharField(max_length=10, choices=ADDRESS_CHOICES, default='shipper')
    address_other = models.CharField(max_length=500, blank=True, default='')

    NEXTDAY_CHOICES = (
        ('1', 'Yes'),
        ('0', '-'),
    )
    nextday = models.CharField(max_length=1, choices=NEXTDAY_CHOICES, default=0)

    CANCEL_CHOICES = (
        ('1', 'Cancel'),
        ('0', '-'),
    )
    cancel = models.CharField(max_length=1, choices=CANCEL_CHOICES, default=0)


    def __str__(self) :
        return self.work_id
