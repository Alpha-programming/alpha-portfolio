from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    description = models.TextField()

    email = models.EmailField(blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    telegram = models.URLField(blank=True)

    profile_image = models.ImageField(
        upload_to="profile/",
        blank=True,
        null=True
    )
    instagram = models.URLField(blank=True)

    university = models.CharField(
        max_length=200,
        blank=True
    )

    major = models.CharField(
        max_length=200,
        blank=True
    )

    study_year = models.CharField(
        max_length=50,
        blank=True
    )

    semester = models.CharField(
        max_length=50,
        blank=True
    )

    ielts = models.CharField(
        max_length=20,
        blank=True
    )

    topik = models.CharField(
        max_length=20,
        blank=True
    )

    learning_duration = models.CharField(
        max_length=100,
        blank=True
    )

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    STATUS_CHOICES = [
        ("learned", "Learned"),
        ("learning", "Learning"),
        ("planned", "Planned"),
    ]

    CATEGORY_CHOICES = [
        ("backend", "Backend"),
        ("frontend", "Frontend"),
        ("database", "Database"),
        ("devops", "DevOps"),
        ("data", "Data Science"),
        ("tools", "Tools"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="learning"
    )

    progress = models.PositiveIntegerField(default=0)

    started_at = models.DateField(
        blank=True,
        null=True
    )

    duration = models.CharField(
        max_length=100,
        blank=True
    )

    description = models.TextField(blank=True)

    icon = models.CharField(
        max_length=100,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("web", "Web Application"),
        ("bot", "Telegram Bot"),
        ("api", "API"),
        ("data", "Data Science"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    short_description = models.CharField(
        max_length=300
    )

    description = models.TextField()

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    image = models.ImageField(
        upload_to="projects/",
        blank=True,
        null=True
    )

    skills = models.ManyToManyField(
        Skill,
        related_name="projects",
        blank=True
    )

    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    telegram_url = models.URLField(blank=True)

    featured = models.BooleanField(default=False)

    created_at = models.DateField(
        blank=True,
        null=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)

    description = models.TextField(
        blank=True
    )

    issue_date = models.DateField(
        blank=True,
        null=True
    )

    image = models.ImageField(
        upload_to="certificates/",
        blank=True,
        null=True
    )

    credential_url = models.URLField(
        blank=True
    )

    def __str__(self):
        return self.title
    
class Experience(models.Model):
    title = models.CharField(max_length=150)
    organization = models.CharField(
        max_length=150,
        blank=True
    )

    description = models.TextField(blank=True)

    category = models.CharField(
        max_length=50,
        blank=True
    )

    started_at = models.DateField()
    ended_at = models.DateField(
        null=True,
        blank=True
    )

    current = models.BooleanField(default=False)

    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-started_at"]

    def __str__(self):
        return self.title