from django.db import models


# Create your models here.

class BasePicture(models.Model):
    class Meta:
        db_table = "painting"

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50, null=True)
    year = models.CharField(max_length=10)
    intro = models.TextField()
    en_title = models.CharField(max_length=100)