# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-24 20:15
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0006_auto_20170523_2030'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seller',
            old_name='seller',
            new_name='user',
        ),
    ]
