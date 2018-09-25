from datetime import datetime, timedelta

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .serializers import BookingSerializer
from .models import Booking
from django.shortcuts import render
from django.db.models import Q

import json

def index(request):
    return render(request, 'reader.html', {'nbar': 'booking'})

@csrf_exempt
def rest_bookings(request):
    context = {}
    context['tmr'] = datetime.now() + timedelta(days=1)
    context['today'] = datetime.now()

    if request.method == "GET":
        bookings = Booking.objects.filter((Q(date__month=context['today'].month) & Q(date__year=context['today'].year))).order_by('date', 'work_id')
        serializer = BookingSerializer(bookings, many=True)

    elif request.method == "POST":
        req = json.loads( request.body.decode('utf-8') )
        context['filter_by'] = req['filter_by']
        context['date_filter'] = req['date_filter']

        if context['filter_by'] == "month":
            month_of_year = datetime.strptime(context['date_filter'], '%Y-%m')
            bookings = Booking.objects.filter((Q(date__month=month_of_year.month) & Q(date__year=month_of_year.year))).order_by('date', 'work_id')
        else:
            bookings = Booking.objects.filter(Q(date=context['date_filter'])).order_by('date', 'work_id')

        serializer = BookingSerializer(bookings, many=True)


    context['bookings'] = serializer.data
    return JsonResponse(context, safe=False)

