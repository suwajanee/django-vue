from django.contrib import admin
from .models import Booking


class BookingAdmin(admin.ModelAdmin):
    list_display = ('date','booking_no', 'container_no','seal_no', \
    'closing_date', 'remark', 'work_id', 'work_number', 'address', 'address_other', 'nextday', 'cancel')

    ordering = ('date', 'work_id')
 
admin.site.register(Booking, BookingAdmin)
