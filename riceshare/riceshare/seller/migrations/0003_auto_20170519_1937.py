# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-19 19:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0002_auto_20170519_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seller',
            name='evaluation',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]