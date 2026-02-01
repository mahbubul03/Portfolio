from rest_framework import serializers
from .models import Project, Skill, ContactMessage, Experience


class ProjectSerializer(serializers.ModelSerializer):
    technologies_list = serializers.SerializerMethodField()
    features_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'timeline', 'technologies', 
                  'technologies_list', 'features', 'features_list', 'status', 
                  'created_at', 'updated_at']

    def get_technologies_list(self, obj):
        return obj.get_technologies_list()

    def get_features_list(self, obj):
        return obj.get_features_list()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'icon', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)


class ExperienceSerializer(serializers.ModelSerializer):
    duration_display = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = ['id', 'role', 'organization', 'start_date', 'end_date', 
                  'duration_display', 'description', 'order']

    def get_duration_display(self, obj):
        return obj.get_duration_display()

