from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField("date created", auto_now_add=True)

class company_Master(models.Model):
    company_Id = models.AutoField
    company_Name = models.CharField(max_length=210)
    Estblish_Date = models.DateField(default='1900-01-01')
    city    = models.CharField(max_length=80, default='')
    state   = models.CharField(max_length=80, default='')
    country = models.CharField(max_length=80, default='')
    zipcode = models.CharField(max_length=8, default='')
    GSTIN = models.CharField(max_length=40, default='')
    CSTIN = models.CharField(max_length=40, default='')

    def __str__(self):
        return self.company_Name    
