from django.contrib import admin
from .models import Company
# Register your models here.

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'number_of_departments', 'number_of_employees', 'created_at')
    search_fields = ['name']
    readonly_fields = ['created_at','updated_at']
