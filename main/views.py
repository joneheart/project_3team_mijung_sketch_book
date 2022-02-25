from django.shortcuts import render, redirect
from .models import BasePicture
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3

# Create your views here.


def home(request):
    if request.method == 'GET':
        pictures = BasePicture.objects.all()

        picture_list = []

        for p in pictures:
            # 영어 제목에서 ' 제거해서 보내주기
            p.enl_title = p.enl_title.replace("’",'')

            picture_list.append(p)


        return render(request, 'main/index.html', {'pictures' : picture_list})


@csrf_exempt
# 선택한 파일 이름, 업로드 한 파일 받기
def paint(request):
    #if request.method == 'POST' and request.FILES['uploadFile']:
    if request.method == 'POST':

        # 유화 이름 받기
        #base_picture_name = request.POST['basepicture']

        print(request)
        # 업로드 파일 받기
        upload_file = request.FILES.get('file')

        print(upload_file)

        return render(request, 'main/result.html')

        # 모델과 통신 및 완료된 이미지 저장

        # s3_client = boto3.client(
        #     's3',
        #     aws_access_key=a,
        #     aws_secret_access_key=b,
        # )
        #
        # s3_client.upload_fileobj(
        #     file,
        #     ""
        # )
    else:
        return render(request, 'main/paint.html')
