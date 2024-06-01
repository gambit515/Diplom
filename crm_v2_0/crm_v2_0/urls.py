"""
URL configuration for crm_v2_0 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from crm_app.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/filial', FilialAPIView.as_view()),
    path('api/schedule', ScheduleAPIView.as_view()),
    path('api/schedule/create', ScheduleCreateAPIView.as_view()),
    path('api/user', UserAPIView.as_view()),
    path('api/procedure', ProcedureAPIView.as_view()),

    #spath('api/get', ScheduleAPIView.as_view()),
    path('api/info/me',GetUserInfo.as_view()),
    path('api/schedule/count',RecordsCountByDateView.as_view()),
    path('api/auth',include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    #path('articles/<string:path_to_img>/', None),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
