from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class UserModel(AbstractUser):
    class Meta:
        db_table = 'user'

    username = models.CharField(max_length=150,)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    #usermodel custom
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
