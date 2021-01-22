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

class columnHeader(models.Model):
    table_name = models.CharField(max_length=40)
    column_sort   = models.IntegerField(default=0)
    column_Header = models.CharField(max_length=40)
    column_Lable = models.CharField(max_length=30,default="Column Header")
    
    def __str__(self):
        return self.column_Header + '(' + self.table_name + ')'

class UOM(models.Model):
    UOM_Code = models.CharField(max_length=3)
    UOM_Name = models.CharField(max_length=30)
    def __str__(self):
        return self.UOM_Code + ' - ' + self.UOM_Name 

class product_Category(models.Model):
    category_Name = models.CharField(max_length=40)
    def __str__(self):
        return self.category_Name

class product_Subcategory(models.Model):
    subcategory_Name = models.CharField(max_length=40)
    def __str__(self):
        return self.subcategory_Name

class Tax_Master(models.Model):
    Tax_name = models.CharField(max_length=40, primary_key=True)
    Tax_percetage = models.DecimalField(max_digits=12,decimal_places=3, default=0)
    def __str__(self):
        return self.Tax_name + "-" + str(self.Tax_percetage)

class Tax_Group(models.Model):
    Tax_GrpCd = models.CharField(max_length=3,default="")
    Tax_Group = models.CharField(max_length=40)
    Tax_Name  = models.ForeignKey(Tax_Master,on_delete=models.CASCADE)
    def __str__(self):
        return str(self.Tax_GrpCd)  + "-" + self.Tax_Group 

class content_Master(models.Model):
    content_Name = models.CharField(max_length=50)
    def __str__(self):
        return self.content_Name
          
class product_Master(models.Model):
    product_Code     = models.CharField(max_length=12,default='')
    product_Name     = models.CharField(max_length=80,default='')
    product_SName    = models.CharField(max_length=30,default='')
    product_Barcode  = models.CharField(max_length=20,default='')
    product_Content  = models.ForeignKey(content_Master,on_delete=models.CASCADE,default='')
    product_VendRef  = models.CharField(max_length=30,default='')
    product_GSTName  = models.CharField(max_length=30,default='')
    product_GSTUnit  = models.CharField(max_length=20,default='')
    product_Schedule = models.CharField(max_length=20,default='')
    product_HSNCode  = models.CharField(max_length=20,default='')
    product_Category = models.ForeignKey(product_Category,on_delete=models.CASCADE,default='')
    product_SubCat   = models.ForeignKey(product_Subcategory,on_delete=models.CASCADE,default='')
    product_Class    = models.CharField(max_length=20,default='')
    product_Pack     = models.DecimalField(max_digits=6,decimal_places=3, default=0)
    product_BUOM     = models.ForeignKey(UOM,on_delete=models.CASCADE,default='')
    product_MfgBy    = models.CharField(max_length=40,default='')    
    product_MktBy    = models.CharField(max_length=80,default='') 
    product_Division = models.CharField(max_length=40,default='')
    product_PuRate   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_SaleRate = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_MRP      = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_Discount = models.DecimalField(max_digits=5,decimal_places=3, default=0)
    product_STaxGrp  = models.CharField(max_length=3,default="")
    product_PTaxGrp  = models.CharField(max_length=3,default="")
    product_MinStk   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_MaxStk   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_MinOrd   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    Product_Location = models.CharField(max_length=20,default='')

    def __str__(self):
        return self.product_Name + '(' + self.product_MktBy + ')'

class product_AUnit(models.Model):
    product = models.ForeignKey(product_Master,on_delete=models.CASCADE)
    product_BQty   = models.DecimalField(max_digits=6,decimal_places=3, default=0)
    product_Factor = models.DecimalField(max_digits=6,decimal_places=3, default=0)
    product_AUOM   = models.ForeignKey(UOM,on_delete=models.CASCADE)

class product_Batch(models.Model):
    product         = models.ForeignKey(product_Master,on_delete=models.CASCADE)
    product_Batch   = models.CharField(max_length=20)
    product_PuRate   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_SaleRate = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_MRP      = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_MfgDate  = models.DateField() 
    product_ExpDate  = models.DateField() 
    product_Discount = models.DecimalField(max_digits=5,decimal_places=3, default=0)
    product_OPStock  = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_OPRate   = models.DecimalField(max_digits=8,decimal_places=3, default=0)
    product_UOM      = models.ForeignKey(UOM,on_delete=models.CASCADE)
    product_CLStock  = models.DecimalField(max_digits=8,decimal_places=3, default=0)

