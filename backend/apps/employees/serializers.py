from rest_framework import serializers
from django.utils import timezone
from .models import Employee, EmployeeStatus
from apps.companies.serializers import CompanySerializer
from apps.departments.serializers import DepartmentSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    """
    this is the main employee serializer with nested company and
    department details
    """
    company_details = CompanySerializer(source='company', read_only=True)
    department_details = DepartmentSerializer(source='department', read_only=True)
    days_employed = serializers.IntegerField(read_only=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'company', 'company_details',
            'department', 'department_details',
            'name', 'email', 'mobile_number',
            'address', 'designation', 'status',
            'hired_on', 'days_employed',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id','hired_on','created_at', 'updated_at']

        def validate(self, data):
            """
            ensure dept belongs to a company
            validate status transitions
            email format validations
            """
            company = data.get('company')
            department = data.get('department')
            new_status = data.get('status')

            # validation if dept belongs to a company
            if company and department and department.company:
                raise serializers.ValidationError({
                    'department' : 'selected dept is not in this selected company'
                })

            # validates status transitions if this is an update
            if self.instance and new_status:
                if not self.instance.can_transition_to(new_status):
                    raise serializers.ValidationError({
                        'status' : f'invalid transition status from {self.instance.status} to {new_status}'
                    })
            return data

class EmployeeListSerializer(serializers.ModelSerializer):
    """
    simplified serializer for list views
    """
    department_name = serializers.CharField(source='department_name', read_only=True)
    company_name = serializers.CharField(source='company_name', read_only=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'name', 'email', 'designation','mobile_number',
            'status', 'department_name', 'company_name'
        ]

class HiredEmployeeReportSerializer(serializers.ModelSerializer):
    """
    specialized serializer for hired employee report
    """
    company_name = serializers.CharField(source='company_name', read_only=True)
    department_name = serializers.CharField(source='department.name')

    class Meta:
        model = Employee
        fields = [
            'id', 'name', 'email', 'designation','mobile_number',
            'hired_on', 'days_employed', 'company_name',
            'department_name'
        ]
