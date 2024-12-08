from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    number_of_departments = serializers.IntegerField(read_only=True)
    number_of_employees = serializers.IntegerField(read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'number_of_departments', 'number_of_employees','created_at','updated_at']
        read_only_fields = ['created_at', 'updated_at']