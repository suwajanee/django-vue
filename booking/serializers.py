from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
        class Meta:
                model = Booking
                fields = ('pk', 'date','booking_no', 'container_no','seal_no', 'closing_date', 'remark', 'work_id', 'work_number', 'address', 'address_other', 'nextday', 'cancel')