from django.apps import AppConfig

from apps import employees


class EmployeesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.employees'

    def ready(self):
        import apps.employees.signals  # Import signals when app is ready
