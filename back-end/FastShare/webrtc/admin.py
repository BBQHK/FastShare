from django.contrib import admin

# Register your models here.
from .models import ReceiveCodeTempStorage, ReceiveCodeCreateRecord, ReceiveCodeAccessRecord

class ReceiveCodeTempStorageAdmin(admin.ModelAdmin):
    # Fields to be displayed in list view.
    list_display = ('id', 'receiveCode', 'created_at')  # replace with your field names
    readonly_fields = ('receiveCode', )

class ReceiveCodeCreateRecordAdmin(admin.ModelAdmin):
    # Fields to be displayed in list view.
    list_display = ('id', 'createrIP', 'receiveCode', 'created_at')  # replace with your field names
    readonly_fields = ('createrIP', 'receiveCode')

class ReceiveCodeAccessRecordAdmin(admin.ModelAdmin):
    # Fields to be displayed in list view.
    list_display = ('id', 'ReceiveCodeCreateRecord', 'receiveCode', 'accessIP', 'status', 'created_at')  # replace with your field names
    readonly_fields = ('ReceiveCodeCreateRecord', 'receiveCode', 'accessIP', 'status')

admin.site.register(ReceiveCodeTempStorage, ReceiveCodeTempStorageAdmin)
admin.site.register(ReceiveCodeCreateRecord, ReceiveCodeCreateRecordAdmin)
admin.site.register(ReceiveCodeAccessRecord, ReceiveCodeAccessRecordAdmin)
