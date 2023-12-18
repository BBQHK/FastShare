from django.db import models

# Create your models here.
class ReceiveCodeTempStorage(models.Model):
    receiveCode = models.CharField(null=True, max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.receiveCode
    
class ReceiveCodeCreateRecord(models.Model):
    id = models.AutoField(primary_key=True)
    createrIP = models.CharField(null=True, max_length=20)
    receiveCode = models.CharField(null=True, max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

# create a model to access of the receive code named ReceiveCodeAccessRecord, foreign key to ReceiveCodeCreateRecord id field
class ReceiveCodeAccessRecord(models.Model):
    id = models.AutoField(primary_key=True)
    ReceiveCodeCreateRecord = models.ForeignKey(ReceiveCodeCreateRecord, on_delete=models.CASCADE)
    receiveCode = models.CharField(null=True, max_length=6)
    accessIP = models.CharField(null=True, max_length=20)
    status = models.CharField(null=True, max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.accessIP