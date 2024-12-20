"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path, include
from rest_framework.documentation import include_docs_urls #  to include DRF's auto-generated API documentation.

# api url patterns with versioning
api_patterns = [
    path('auth/', include('apps.accounts.urls')),
    # will update this once i finish other apps implementations
    path('companies/', include('apps.companies.urls')),
    path('departments/', include('apps.departments.urls')),
    path('employees/', include('apps.employees.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    # API V1 endpoints
    path('api/v1/', include(api_patterns)),

    # API Documentation as requested in the pdf
    path('docs/', include_docs_urls(title='Employee Management System API')),
]
