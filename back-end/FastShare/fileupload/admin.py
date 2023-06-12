from django.contrib import admin

# Register your models here.
admin.site.site_header = 'FastShare Admin'
admin.site.site_title = 'FastShare Admin Portal'
admin.site.index_title = 'Welcome to FastShare Admin Portal'

from .models import File

admin.site.register(File)