from django.db import models


# Create your models here.

class BasePicture(models.Model):
    class Meta:
        db_table = "painting"

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50, null=True)
    year = models.CharField(max_length=10)
    intro = models.TextField()
    enl_title = models.CharField(max_length=100, default='')


class MyPaintingPicture(models.Model):
    class Meta:
        db_table = "myarticle"

    base_picture_id = models.ForeignKey(BasePicture, on_delete=models.PROTECT)
    # 역참조 할 필요가 있어 related_name 지정
    painter = models.ForeignKey('user.UserModel', on_delete=models.CASCADE, related_name='painting')
    title = models.CharField(max_length=50)
    picture = models.FileField(upload_to='media/', default='')



