# Generated by Django 4.2.1 on 2023-06-12 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("fileupload", "0003_alter_file_filesize_alter_file_filetype"),
    ]

    operations = [
        migrations.AddField(
            model_name="file",
            name="receiveCode",
            field=models.CharField(max_length=255, null=True),
        ),
    ]