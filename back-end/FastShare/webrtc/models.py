from django.db import models

# Create your models here.
class ReceiveCodeRecord(models.Model):
    receiveCode = models.CharField(null=True, max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.receiveCode
