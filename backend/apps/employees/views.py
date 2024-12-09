from django.shortcuts import render
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Employee, EmployeeStatus
from .serializers import (
EmployeeSerializer,
EmployeeListSerializer,
HiredEmployeeReportSerializer
)
# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Employee model :
    CRUD operations
    status transitions
    filtering and search
    employee reports
    """
    queryset = Employee.objects.all() # retrieves all employees by default
    filter_backends = (DjangoFilterBackend,filters.SearchFilter) # allows filter and search for this model
    filterset_fields = ['company','department','status']
    search_fields = ['name', 'email', 'designation']

    def get_serializer_class(self):
        """
        USE different serializer for different actions:
        list : simplified serializer
        others: full serializer
        """
        if self.action == 'list':
            return EmployeeListSerializer
        return EmployeeSerializer

    def get_permissions(self):
        """
        implements role based access
        view any auth user
        create/update/delete : manager or admin
        """
        if self.action in ['create','update','partial_update','destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def transition(self, request, pk=None):
        """
        handle employee status transitions
        POST : /api/v1/employees/{id}/transition
        payload = {"status": "NEW_STATUS"}
        """
        employee = self.get_object()
        new_status = request.data['status']

        if not new_status:
            return Response(
                {'status': 'new status is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not employee.can_transition_to(new_status):
            return Response(
                {'status': 'cannot transition to this status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        employee.status = new_status
        employee.save()

        serializer = self.get_serializer(employee)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def hired_report(self, request):
        """
        this logic generates report of hired employees
        GET : /api/v1/employees/hired_report
        """
        hired_employees = Employee.objects.filter(
            status=EmployeeStatus.HIRED
        ).select_related('company', 'department')

        serializer = HiredEmployeeReportSerializer(hired_employees, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """
        sets initial status and hired on date
        """
        if serializer.validated_data.get('status') == EmployeeStatus.HIRED:
            serializer.save(hired_on=timezone.now())
        else:
            serializer.save()
