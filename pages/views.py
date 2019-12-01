import json
from django.http import JsonResponse
from django.views.generic import TemplateView
from .models import Photo

class HomePageView(TemplateView):
    template_name = 'home.html'

def upload_file(request):
    body = json.loads(request.body)
    photos = body['metadata']
    Photo.save_many(photos, request.user)
    return get_file(request)

def get_file(request):
    results = Photo.objects.filter(user=request.user).values('name', 'lat', 'lon', 'timestamp', 'id')
    return JsonResponse({'results': list(results)})

def delete_files(request):
    Photo.delete_all(request.user)
    return get_file(request)

def delete_file(request, id):
    Photo.delete_one(request.user, id)
    return get_file(request)
