from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateSerializer

User = get_user_model()

class LoginView(TokenObtainPairView):
    """
    LOGIN ENDPOINT returns JWT tokens for authentication.
    will use this in the login page requirement in the frontend.
    """
    pass

class RegisterView(generics.CreateAPIView):
    """
    user registration endpoint.
    allows creation of a new user account with role spec.
    """
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

class UserListView(generics.ListAPIView):
    """
    list all users endpoint. (admin only)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveAPIView):
    """
    get / update user detail - user account management
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        users can edit/view their own profile
        admins can edit and view any profile
        """
        if self.request.method in ['PUT', 'PATCH']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]







