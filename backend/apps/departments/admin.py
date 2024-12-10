from django.contrib import admin
from .models import Department
# Register your models here.

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'number_of_employees', 'created_at')
    list_filter = 'company',
    search_fields = ('name','company__name')
    readonly_fields = ('created_at','updated_at')
