from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Project, Skill, ContactMessage, Experience
from .serializers import ProjectSerializer, SkillSerializer, ContactMessageSerializer, ExperienceSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = None  # Disable pagination for projects


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    pagination_class = None  # Disable pagination for skills

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        # Group skills by category
        skills_by_category = {}
        for skill in serializer.data:
            category = skill['category']
            if category not in skills_by_category:
                skills_by_category[category] = []
            skills_by_category[category].append(skill)
        
        return Response(skills_by_category)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post']  # Only allow POST
    authentication_classes = []  # No authentication required (exempts from CSRF)
    permission_classes = []  # Already set to AllowAny in settings

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                {'message': 'Thank you for your message! I will get back to you soon.'},
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            # Log the error for debugging
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f'Error creating contact message: {str(e)}')
            return Response(
                {'error': 'An error occurred while sending your message. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    pagination_class = None  # Disable pagination for experience

