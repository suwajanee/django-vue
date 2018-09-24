from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .serializers import BookingSerializer
from .models import Booking
from django.shortcuts import render

def index(request):
    return render(request, 'reader.html', {'nbar': 'booking'})

@csrf_exempt
def rest_bookings(request):
    if request.method == "GET":
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return JsonResponse(serializer.data, safe=False)

