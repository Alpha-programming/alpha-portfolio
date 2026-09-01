from django.urls import path

from .views import (
    ProfileListView,
    SkillListView,
    ProjectListView,
    ProjectDetailView,
    CertificateListView,
    ExperienceListView
)


urlpatterns = [
    path("profile/", ProfileListView.as_view(), name="profile-list"),
    path("skills/", SkillListView.as_view(), name="skill-list"),
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("certificates/", CertificateListView.as_view(), name="certificate-list"),
    path("projects/<slug:slug>/",ProjectDetailView.as_view(), name="project-detail"),
    path("experiences/", ExperienceListView.as_view(), name="experience-list"),
]