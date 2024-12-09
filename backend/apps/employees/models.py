from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, EmailValidator
from django.utils import timezone
from apps.companies.models import Company
from apps.departments.models import Department
# Create your models here.

class EmployeeStatus(models.Model):
    """
    workflow status for employees:
    application received => schedule an interview => hired / not accepted :(
    """
    APPLICATION_RECEIVED = "APPLICATION_RECEIVED", 'application received'
    INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED", 'interview scheduled'
    HIRED = "HIRED", 'hired'
    NOT_ACCEPTED = "NOT_ACCEPTED", 'not accepted'

class Employee(models.Model):
    """
    from tasks.pdf
    - company (Select)
    - department (Select, only from selected company)
    - employee Status
    - employee Name
    - email Address
    - mobile Number
    - address
    - designation
    - hired On (Only if hired)
    - days Employed (calculated, only if hired)
    """
    # relationship fields
    company = models.ForeignKey(Company, on_delete=models.CASCADE,
                                related_name='employees')
    department = models.ForeignKey(Department, on_delete=models.CASCADE,
                                   related_name='employees')

    # employee details
    name = models.CharField(max_length=255)
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message="enter a valid email please")]
    )
    mobile_number = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="enter a valid mobile number please \n" 
                        "must be in the format : '+999999999' ( up to 15 digits)"
            )
        ]
    )
    address = models.TextField()
    designation = models.CharField(max_length=100)

    # status and dates
    status = models.CharField(
        max_length=20,
        choices=EmployeeStatus.choices,
        default=EmployeeStatus.APPLICATION_RECEIVED
    )
    hired_on = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "employee"
        verbose_name_plural = "employees"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.designation} ({self.department})"

