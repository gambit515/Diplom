# Generated by Django 5.0.1 on 2024-01-24 08:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crm_app', '0006_rename_operaion_operation_remove_record_type_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Operation',
            new_name='Procedure',
        ),
        migrations.RenameField(
            model_name='record',
            old_name='Operation',
            new_name='Procedure',
        ),
    ]
