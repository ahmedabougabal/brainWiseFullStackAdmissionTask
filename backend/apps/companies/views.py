from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAdminUser

from .models import Company
from .serializers import CompanySerializer
# Create your views here.

class CompanyViewSet(viewsets.ModelViewSet):
    """
    this will be a viewset for the company model (provides Crud operations)
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        """
        implement role based access control where anyone can view
        companies but only admins can create/update/delete companies
        """
        if self.action == ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]