# Generated by Django 2.1.1 on 2018-09-21 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='work_number',
            field=models.IntegerField(default=0),
        ),
    ]
