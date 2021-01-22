from django.urls import path, include

from django.contrib import admin

admin.autodiscover()

import pharmacy.views

# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [
    path("",pharmacy.views.login_request,name="login"),
    path("logout",pharmacy.views.logout_request,name="logout"),
    path("home",pharmacy.views.index,name="index"),
    path("db/", pharmacy.views.db, name="db"),
    path("admin/", admin.site.urls),
    path("dyncolheader",pharmacy.views.dyncolheader,name="dyncolheader"),
    path("listUOM_Ajax",pharmacy.views.listUOM_Ajax,name="listUOM_Ajax"),
    path("products",pharmacy.views.products,name="products"),
    path("arProductSave",pharmacy.views.arProductSave,name="arProductSave"),
    path("listContentColHead",pharmacy.views.listContentColHead,name="listContentColHead"),
    path("listContent",pharmacy.views.listContent,name="listContent"),
]
