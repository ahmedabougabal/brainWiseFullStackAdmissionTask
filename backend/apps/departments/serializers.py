from os.path import exists

from rest_framework import serializers
from .models import Department
from apps.companies.serializers import CompanySerializer

class DepartmentSerializer(serializers.ModelSerializer):
    """
    dept serializer
    --> provides nested company details for GET request
    allow company selection by id for post / put requests
    has calc number of employees
    """
    company_details = CompanySerializer(source='company',read_only=True)
    number_of_employees = serializers.IntegerField(read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'company', 'company_details', 'name','number_of_employees',
                  'created_at', 'updated_at']

        read_only_fields = ['id','created_at', 'updated_at']

        def validate(self, data):
            """
            validate department name is unique to the company
            """
            company =data.get('company')
            name = data.get('name')
            # will do an IF condition to check if the dept name already exists inside the company
            if self.instance:
                exists = Department.objects.filter(
                    company = company,
                    name = name
                ).exclude(id=self.instance.id).exists()
            else: # this is for department creations if they don't exist in the company
                exists = Department.objects.filter(
                    company = company,
                    name= name
                ).exists()

            if exists:
                raise serializers.ValidationError(
                    {'name':'department with this name already exists.'}
                )
            return data









