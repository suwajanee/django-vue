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

def add_booking(request):
    return render(request, 'reader_add.html', {'nbar': 'booking'})

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
        if context['date_filter'] == '':
            context['date_filter'] = None

        if context['date_filter'] == None:
            bookings = Booking.objects.filter((Q(date__month=context['today'].month) & Q(date__year=context['today'].year))).order_by('date', 'work_id')
        elif context['filter_by'] == "month":
            month_of_year = datetime.strptime(context['date_filter'], '%Y-%m')
            bookings = Booking.objects.filter((Q(date__month=month_of_year.month) & Q(date__year=month_of_year.year))).order_by('date', 'work_id')
        else:
            bookings = Booking.objects.filter(Q(date=context['date_filter'])).order_by('date', 'work_id')

        serializer = BookingSerializer(bookings, many=True)


    context['bookings'] = serializer.data
    return JsonResponse(context, safe=False)

@csrf_exempt
def rest_time_bookings(request):
    context = {}
    if request.method == "POST":
        req = json.loads( request.body.decode('utf-8') )
        pk_list = req["checked_bookings"]
        if pk_list == []:
            pk_list = request.session['checked_bookings']
        if isinstance(pk_list, str):
            pk_list = req["checked_bookings"].split(',')
        bookings = Booking.objects.filter(pk__in=pk_list).order_by('date', 'work_id')

        request.session['checked_bookings'] = pk_list

    serializer = BookingSerializer(bookings, many=True)
    context['bookings'] = serializer.data


    return JsonResponse(context, safe=False)

@csrf_exempt
def rest_edit_bookings(request):
    context = {}
    if request.method == "POST":
        req = json.loads( request.body.decode('utf-8') )
        bookings = req["booking"]
        for booking in bookings:
            booking_edit = Booking.objects.get(pk=booking['pk'])
            booking_edit.booking_no = booking['booking_no']

            booking_edit.save()

        booking_list = rest_bookings(request)
        
    # serializer = BookingSerializer(booking_list, many=True)
    # context['bookings'] = serializer.data


    return booking_list


@csrf_exempt
def rest_delete_bookings(request):
    if request.method == "POST":
        req = json.loads( request.body.decode('utf-8') )
        pk_list = req["pk"]
        for pk in pk_list:
            booking = Booking.objects.get(pk=pk)
            booking.delete()
        booking_list = rest_bookings(request)
    return booking_list


@csrf_exempt
def rest_select_shipper(request):
    shipper = [{'prin':1, 'name': 'blue'},{'prin':1, 'name': 'red'},{'prin':1, 'name': 'green'}, {'prin':2, 'name': 'pink'}, {'prin':2, 'name': 'white'}]
    if request.method == "POST":
        req = json.loads( request.body.decode('utf-8') )
        prin = req["prin"]
        print(shipper)
        print(prin)
        # shippers = filter(myFunc, shipper)
    return JsonResponse([{'prin':1, 'name': 'blue'},{'prin':1, 'name': 'red'},{'prin':1, 'name': 'green'}], safe=False)


