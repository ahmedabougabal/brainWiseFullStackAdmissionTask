from django.db import models
from django.core.exceptions import ValidationError
from apps.companies.models import Company
# Create your models here.

class Department(models.Model):
    """
    dept model
    company - select
    dept name
    number of employees (dynamic calculation)
    """
    company = models.ForeignKey(Company,
                                on_delete=models.CASCADE,
                                related_name='departments' # --> this is for reverse lookup from the company model
# will use cascade here as when the company is deleted,
                                # its depts are also gone.
    )
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Department"
        verbose_name_plural = "Departments"
        ordering = ['company', 'name']

    def __str__(self):
        return f"{self.company.name} - {self.name}"

    @property
    def number_of_employees(self):
        """
        auto calc of number of employees
        """
        return self.employees.count()

    def clean(self):
        """
        custom validation of dept model
        """
        if not self.name:
            raise ValidationError({'name': ['Department name cannot be blank']})

        if not self.company:
            raise ValidationError({'company': ['company is required']})
