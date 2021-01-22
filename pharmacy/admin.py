from django.contrib import admin
from .models import company_Master, product_Master
from .models import Tax_Master, Tax_Group, columnHeader
from .models import product_Category, product_Subcategory, UOM, content_Master, product_Batch
# Register your models here.


admin.site.register(company_Master)
admin.site.register(product_Master)
admin.site.register(Tax_Master)
admin.site.register(Tax_Group)
admin.site.register(columnHeader)
admin.site.register(product_Category)
admin.site.register(product_Subcategory)
admin.site.register(UOM)
admin.site.register(content_Master)
admin.site.register(product_Batch)