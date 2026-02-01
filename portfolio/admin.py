from django.contrib import admin
from .models import Project, Skill, ContactMessage, Experience


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'timeline', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order')
    list_filter = ('category',)
    search_fields = ('name',)
    ordering = ('category', 'order')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at', 'read', 'preview_message')
    list_filter = ('read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('read',)
    fields = ('name', 'email', 'message', 'created_at', 'read')
    list_per_page = 25
    date_hierarchy = 'created_at'
    
    def preview_message(self, obj):
        """Show first 50 characters of message"""
        if obj.message:
            return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
        return '-'
    preview_message.short_description = 'Message Preview'


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'organization', 'start_date', 'end_date', 'order')
    list_filter = ('organization',)
    search_fields = ('role', 'organization', 'description')
    ordering = ('-order', '-start_date')
    list_editable = ('order',)
