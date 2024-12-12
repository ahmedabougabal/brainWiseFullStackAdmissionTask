from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .models import Employee

User = get_user_model()

@receiver(pre_save, sender=Employee)
def validate_employee_email(sender, instance, raw=False, **kwargs):
    """Ensure email is not already taken in User model"""
    if raw:  # this if condition is to skip validation during fixture loading for testing
        return
        
    if User.objects.filter(email=instance.email).exists():
        # If this is an update and the email belongs to this employee's user, allow it
        try:
            current_employee = Employee.objects.get(pk=instance.pk)
            if current_employee.email == instance.email:
                return
        except Employee.DoesNotExist:
            pass
        raise ValidationError("This email is already registered in the system.")

@receiver(post_save, sender=Employee)
def create_user_for_employee(sender, instance, created, raw=False, **kwargs):
    """Create a User instance for new employees"""
    if raw:  # Skip user creation during fixture loading
        return
        
    if created:  # Only when the employee is first created from django admin panel
        # Generate a username from email (before @)
        username = instance.email.split('@')[0]
        
        # Create user with a random password that must be changed on first login
        user = User.objects.create_user(
            username=username,
            email=instance.email,
            password='ChangeMe123!',  # temp password that can be changed by a super user inside the django admin panel
            first_name=instance.name.split()[0] if instance.name else '',
            last_name=' '.join(instance.name.split()[1:]) if instance.name and len(instance.name.split()) > 1 else '',
            role='EMPLOYEE'
        )
        user.is_active = True
        user.save()
