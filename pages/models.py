from django.db import models
from django.utils import timezone
from users.models import CustomUser
from datetime import datetime

def get_coordinate(gps, ref):
    coordinate = gps[0] + gps[1]/60 + gps[2]/3600
    if ref == 'W':
        coordinate = -coordinate
    return coordinate

def get_timestamp(timestamp_string):
    datetime_object = datetime.strptime(timestamp_string, '%Y:%m:%d %H:%M:%S')
    return datetime_object

# Create your models here.
class Photo(models.Model):
    name = models.CharField(max_length=120)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def save_many(photos, user):
        for photo in photos:
            name = photo['ImageDescription']
            lat = get_coordinate(photo['GPSLatitude'], photo['GPSLatitudeRef'])
            lon = get_coordinate(photo['GPSLongitude'], photo['GPSLongitudeRef'])
            timestamp = get_timestamp(photo['DateTimeOriginal'])
            photo_model = Photo(name=name, lat=lat, lon=lon, timestamp=timestamp, user=user)
            photo_model.save()

    def get_all(user):
        return Photo.objects.filter(user=user).values('id', 'name', 'lat', 'lon', 'timestamp')

    def delete_all(user):
        return Photo.objects.filter(user=user).delete()

    def delete_one(user,id):
        return Photo.objects.filter(user=user,id=id).delete()