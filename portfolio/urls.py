from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillViewSet, ContactMessageViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'experience', ExperienceViewSet, basename='experience')

urlpatterns = [
    path('', include(router.urls)),
]

