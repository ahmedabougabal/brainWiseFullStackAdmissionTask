from django.db import models
from django.core.exceptions import ValidationError
# Create your models here.

class Company(models.Model):
    """
    company model
    - company name
    - number of departments
    - number of employees
    """
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = "Companies"
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def number_of_departments(self):
        """
        automatically calculates number of departments
        """
        return self.departments.count()

    @property
    def number_of_employees(self):
        """
        automatically calculates number of employees
        """
        return sum(dept.number_of_employees for dept in self.departments.all())

    def clean(self):
        """
        this should be for the custom validation as asked inside the pdf
        --> validates all required fields are filled
        """
        if not self.name:
            raise ValidationError({'name':'Company name cannot be empty'})




