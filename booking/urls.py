from . import views
from django.urls import include, path

urlpatterns = [
    path('table/', views.rest_bookings, name='booking-table'),
    path('time/', views.rest_time_bookings, name='booking-time'),
    path('edit/', views.rest_edit_bookings, name='booking-edit'),
    path('delete/', views.rest_delete_bookings, name='booking-delete'),
    path('', views.index, name='index'),
    path('add/', views.add_booking, name='add'),
    path('shipper/', views.rest_select_shipper, name='shipper'),
]