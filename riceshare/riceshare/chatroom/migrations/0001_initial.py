# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-08 10:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room', models.TextField()),
                ('message', models.TextField()),
            ],
        ),
    ]
