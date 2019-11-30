# pages/urls.py
from django.urls import path
from .views import HomePageView, upload_file, get_file, delete_files, delete_file

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('upload', upload_file, name='upload'),
    path('files', get_file, name='files'),
    path('delete', delete_files, name='delete_files'),
    path('delete/<int:id>', delete_file, name='delete_file'),
]
