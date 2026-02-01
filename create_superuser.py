#!/usr/bin/env python
"""
Script to create a Django superuser non-interactively.
Usage: python create_superuser.py
"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_superuser():
    username = input("Enter username (default: admin): ").strip() or "admin"
    email = input("Enter email: ").strip()
    
    if not email:
        print("Email is required!")
        return
    
    # Check if user already exists
    if User.objects.filter(username=username).exists():
        print(f"User '{username}' already exists!")
        return
    
    password = input("Enter password: ").strip()
    if not password:
        print("Password is required!")
        return
    
    confirm_password = input("Confirm password: ").strip()
    if password != confirm_password:
        print("Passwords don't match!")
        return
    
    try:
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"\n✓ Superuser '{username}' created successfully!")
        print(f"You can now log in at http://localhost:8000/admin")
    except Exception as e:
        print(f"\n✗ Error creating superuser: {e}")

if __name__ == "__main__":
    create_superuser()

