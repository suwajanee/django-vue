from . import views
from django.urls import include, path

urlpatterns = [
    path('table/', views.rest_bookings, name='booking-table'),
    path('time/', views.rest_time_bookings, name='booking-time'),
    path('', views.index, name='index')
]