from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class UserRole(models.TextChoices):
    ADMIN = 'ADMIN', 'admin'
    MANAGER = 'MANAGER', 'manager'
    EMPLOYEE = 'EMPLOYEE', 'employee'

class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=10,
        choices= UserRole.choices,
        default=UserRole.EMPLOYEE,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        """if I am creating a superuser, i will be assigned to admin"""
        if self.is_superuser:
            self.role = UserRole.ADMIN
        super().save(*args, **kwargs)
