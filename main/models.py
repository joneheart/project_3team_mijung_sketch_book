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

    # 임시 FK로 user 모델에서 불러 올 예정
    painter = models.CharField(max_length=50)



