from django.contrib import admin
from .models import Employee

# Register your models here.

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'company','department', 'designation', 'status','days_employed')
    list_filter = ('status', 'company', 'department')
    search_fields = ('name', 'email','designation')
    readonly_fields = ('days_employed','created_at','updated_at')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # depts choices are specific only for selected companies
        if obj and obj.company:
            form.base_fields['department'].queryset = obj.company.departments.all()
        return form
