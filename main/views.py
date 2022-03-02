from django.shortcuts import render, redirect
from .models import BasePicture, MyPaintingPicture
from user.models import UserModel
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import requests
import boto3
import time

# Create your views here.

@login_required(login_url='/')
def index(request):
    if request.method == 'GET':
        pictures = BasePicture.objects.all()

        picture_list = []

        for p in pictures:
            # 영어 제목에서 ' 제거해서 보내주기
            p.enl_title = p.enl_title.replace("’", '')

            picture_list.append(p)

        return render(request, 'main/index.html', {'pictures' : picture_list})


def paint(request, id):
    # index에서 넘어온 id 값 다시 전달
    print(id)
    return render(request, 'main/paint.html', {'id': id})

# @login_required(login_url='/')
@csrf_exempt
# 선택한 파일 이름, 업로드 한 파일 받기
def painting(request):
    if request.method == 'POST' and request.FILES['file']:


        upload_file = request.FILES['file'] # 업로드 한 파일
        id_receive = request.POST['id'] # base picture id 값
        title = request.POST['title'] # 작품 설명
        user_id = request.user.id # 유저 id
        base_picture = BasePicture.objects.get(id=id_receive) # 선택한 유화 객체


        # 유저 id와 title로 중복되지 않는 파일명 생성 및 ai 서버에 전달
        file_name = f"{user_id}_{title}_{int(time.time())}"


        # AI 서버와 통신
        URL = "http://localhost:8000/api/v1/nsts/"
        payload = {'key': file_name,
                   'picture': base_picture.enl_title}
        file = [('img', upload_file)]

        res = requests.post(URL, data=payload, files=file)
        print(res.json()) # 사진 이름 받고


        # 결과 파일 업로드 picture에 결과 파일 넣어주기
        MyPaintingPicture.objects.create(title=title,
                                         base_picture_id=base_picture,
                                         painter=user_id,
                                         picture=file_name)

        return render(request, 'main/result.html')


@login_required(login_url='/')
def result(request):
    return render(request, 'main/result.html')

@login_required(login_url='/')
def mypage(request):
    u_id = request.user.id
    u = UserModel.objects.get(id=u_id)
    pictures = u.painting.all()
    return render(request, 'user/mypage.html', {'pictures': pictures})
