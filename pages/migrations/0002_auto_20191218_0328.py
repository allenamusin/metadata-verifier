# Generated by Django 2.2.5 on 2019-12-18 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='airspace_class',
            field=models.CharField(default='G', max_length=120),
        ),
        migrations.AddField(
            model_name='photo',
            name='airspace_name',
            field=models.CharField(default='', max_length=120),
        ),
    ]