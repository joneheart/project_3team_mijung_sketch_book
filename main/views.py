from django.shortcuts import render, redirect
from .models import BasePicture, MyPaintingPicture
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import requests
import boto3

# Create your views here.

@login_required(login_url='/login')
def index(request):
    if request.method == 'GET':
        pictures = BasePicture.objects.all()

        picture_list = []

        for p in pictures:
            # 영어 제목에서 ' 제거해서 보내주기
            p.enl_title = p.enl_title.replace("’", '')

            picture_list.append(p)

        return render(request, 'main/index.html', {'pictures' : picture_list})


# @login_required(login_url='/login')
@csrf_exempt
# 선택한 파일 이름, 업로드 한 파일 받기
def paint(request):
    if request.method == 'POST' and request.FILES['file']:

        # 업로드 한 파일 받기
        upload_file = request.FILES['file']

        # base picture id 값
        id_receive = request.POST['id']

        # 작품 설명
        title = request.POST['title']

        # 유저 id
        # user_id = request.user.id

        print(upload_file, id_receive, title)

        base_picture = BasePicture.objects.get(id=id_receive)
        print(base_picture)


        # AI 서버와 통신
        # 결과 이미지 파일 받기 result_file
        URL = "http://localhost:8000/api/v1/nsts/"
        payload = {'key': 'titleis',
                   'picture': 'The_Kiss'}
        file = [('img', upload_file)]

        res = requests.post(URL, data=payload, files=file)
        print(res)


        # 결과 파일 업로드 picture에 결과 파일 넣어주기~!
        # MyPaintingPicture.objects.create(title=title, base_picture_id=base_picture,
        #                                  picture=upload_file)

        return render(request, 'main/result.html')

    # else:
    #     # index에서 넘어온 id 값 다시 전달
    #     print(id)
    #     print(request.user.id)
    #     return render(request, 'main/paint.html', {'id' : id})


@login_required(login_url='/login')
def result(request):
    pass