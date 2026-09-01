from django.contrib import admin
from .models import Profile, Skill, Project, Certificate, Experience


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "updated_at")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "status",
        "progress",
    )
    list_filter = (
        "category",
        "status",
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "featured",
        "created_at",
    )
    list_filter = (
        "category",
        "featured",
    )
    prepopulated_fields = {
        "slug": ("title",)
    }
    filter_horizontal = ("skills",)


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "organization",
        "issue_date",
    )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "organization",
        "started_at",
        "ended_at",
        "current",
        "order",
    )

    list_filter = (
        "current",
        "category",
    )

    search_fields = (
        "title",
        "organization",
        "description",
    )

    ordering = (
        "order",
        "-started_at",
    )