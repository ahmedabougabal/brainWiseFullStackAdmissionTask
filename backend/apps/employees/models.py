from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, EmailValidator
from django.utils import timezone
from apps.companies.models import Company
from apps.departments.models import Department
# Create your models here.

class EmployeeStatus(models.TextChoices):
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
        choices=[(status.value, status.label) for status in EmployeeStatus],
        default=EmployeeStatus.APPLICATION_RECEIVED.value
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

    @property
    def days_employed(self):
        """
        calculate days employed if the employee is hired
        -- returns None if not hired
        """
        if self.status == EmployeeStatus.HIRED.value and self.hired_on:
            return (timezone.now() - self.hired_on).days
        return None

    def clean(self):
        """
        adds some custom validation checks
        1- ensures department belongs to company
        2. validates hired on date based on status
        3. all required fields must be filled
        """
        if self.department and self.company and self.department.company != self.company:
            raise ValidationError({
                'department': 'selected department does not belong to this company'
            })
        if self.status == EmployeeStatus.HIRED and not self.hired_on:
            raise ValidationError({
                'hired': 'hired on date must be filled for hired employees'
            })
        if self.status != EmployeeStatus.HIRED and self.hired_on:
            raise ValidationError({
                'hired_on': 'hire date must be filled for hired employees'
            })

    def save(self, *args, **kwargs):
            """
            this method overrides save to:
            - sets hired on date automatically when status changes to HIRED
            - clear hired on date if status changes from Hired
            - runs full clean for validation
            """

            if self.status == EmployeeStatus.HIRED and not self.hired_on:
                self.hired_on = timezone.now()
            elif self.status != EmployeeStatus.HIRED.value:
                self.hired_on = None

            self.full_clean()
            super().save(*args, **kwargs)

    def can_transition_to(self, new_status):
            """
            validate status transitions according to workflow
            """
            current_status = self.status
            allowed_transitions = {
                EmployeeStatus.APPLICATION_RECEIVED.value: {
                    EmployeeStatus.INTERVIEW_SCHEDULED.value,
                    EmployeeStatus.NOT_ACCEPTED.value
                },
                EmployeeStatus.INTERVIEW_SCHEDULED.value: {
                    EmployeeStatus.HIRED.value,
                    EmployeeStatus.NOT_ACCEPTED.value
                },
                EmployeeStatus.HIRED.value:set(), # no transitions from hired
                EmployeeStatus.NOT_ACCEPTED.value: set() # no transitions from not accepted
            }
            return new_status in allowed_transitions.get(current_status, set())


