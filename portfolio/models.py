from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    timeline = models.CharField(max_length=100)
    technologies = models.TextField(help_text="Comma-separated list of technologies")
    features = models.TextField(help_text="Features separated by newlines")
    status = models.CharField(max_length=50, default="Running")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]

    def get_features_list(self):
        return [feature.strip() for feature in self.features.split('\n') if feature.strip()]


class Skill(models.Model):
    SKILL_CATEGORIES = [
        ('programming', 'Programming'),
        ('web', 'Web'),
        ('hardware', 'Hardware'),
        ('tools', 'Tools'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=SKILL_CATEGORIES)
    icon = models.CharField(max_length=100, blank=True, help_text="Icon name or class")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name}"


class Experience(models.Model):
    role = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    start_date = models.CharField(max_length=50, help_text="e.g., November 2025")
    end_date = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., Present or December 2025")
    description = models.TextField()
    order = models.IntegerField(default=0, help_text="Order for display (higher number appears first)")

    class Meta:
        ordering = ['-order', '-start_date']

    def __str__(self):
        return f"{self.role} at {self.organization}"
    
    def get_duration_display(self):
        if self.end_date:
            return f"{self.start_date} – {self.end_date}"
        return f"{self.start_date} – Present"

