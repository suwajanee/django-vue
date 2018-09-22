from . import views
from django.urls import include, path

urlpatterns = [
    path('table/', views.rest_bookings, name='booking-table'),
    path('', views.index, name='index')
]