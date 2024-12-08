from django.apps import AppConfig

from apps import companies


class CompaniesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.companies'
