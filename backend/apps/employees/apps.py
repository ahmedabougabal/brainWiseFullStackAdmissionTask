from django.apps import AppConfig

from apps import employees


class EmployeesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.employees'
