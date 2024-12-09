from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Department
from .serializers import DepartmentSerializer
from apps.employees.serializers import EmployeeSerializer # will add this later to employees app
# Create your views here.

class DepartmentViewSet(viewsets.ModelViewSet):
    """
    viewset for department model that provides CRUD operations
    1- crud operations
    2- access control via role
    3- filter by companies
    4- search by department name
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['company']
    search_fields = ['name']

    def get_permissions(self):
        """
        implements role based access:
        any auth user can view departments
        --> only admin, managers can create/update/delete departments
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['get'])
    def employees(self, request, pk=None):
        """
        this is a custom endpoint to GET all employees in a department
        GET /api/v1/departments/{id}/employees
        """
        department = self.get_object()
        employees = department.employees.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

