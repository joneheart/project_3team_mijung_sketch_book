from django.shortcuts import render, redirect
from .models import BasePicture, MyPaintingPicture
from user.models import UserModel
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import requests
import boto3
import time
import datetime

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
    return render(request, 'main/workplace_B.html', {'id': id})

# @login_required(login_url='/')
@csrf_exempt
# 선택한 파일 이름, 업로드 한 파일 받기
def painting(request):
    if request.method == 'POST' and request.FILES['file']:


        upload_file = request.FILES['file'] # 업로드 한 파일
        id_receive = request.POST['id'] # base picture id 값
        title = request.POST['title'] # 작품 제목
        content = request.POST['content'] # 작품 설명
        user_id = request.user.id # 유저 id
        base_picture = BasePicture.objects.get(id=id_receive) # 선택한 유화 객체


        # 유저 id와 title로 중복되지 않는 파일명 생성 및 ai 서버에 전달
        file_name = f"{user_id}_{title}_{int(time.time())}"


        # 유저 모델 인스턴스 불러오기
        user_instance = UserModel.objects.get(id=user_id)


        # AI 서버와 통신
        # URL = "http://localhost:8000/api/v1/nsts/" # local test
        URL = "http://mijung-sketchbook-ai-dev2.ap-northeast-2.elasticbeanstalk.com/api/v1/nsts/"
        payload = {'key': file_name,
                   'picture': base_picture.enl_title}
        file = [('img', upload_file)]

        sess = requests.Session()
        adapter = requests.adapters.HTTPAdapter(pool_connections=100, pool_maxsize=100)
        sess.mount('http://', adapter)
        res = sess.post(URL, data=payload, files=file)
        # res = requests.post(URL, data=payload, files=file) # local test okay
        print(res.json()) # 사진 이름 받고

        today_year = datetime.date.today().year

        # 결과 파일 업로드 picture에 결과 파일 넣어주기
        obj = MyPaintingPicture.objects.create(title=title,
                                         year=today_year,
                                         content=content,
                                         base_picture_id=base_picture,
                                         painter=user_instance,
                                         picture=file_name)

        print(obj)
        return render(request, 'main/workplace_A.html', {'result_obj' : obj})



@login_required(login_url='/')
def mypage(request):
    u_id = request.user.id
    u = UserModel.objects.get(id=u_id)
    pictures = u.painting.all()
    return render(request, 'user/mypage.html', {'pictures': pictures})


def delete_painting(request):
    if request.method == 'POST':
        id = request.POST['id']

        MyPaintingPicture.objects.get(id=id).delete()

        return redirect('mypage')


def detail(request, id):
    picture = MyPaintingPicture.objects.get(id=id)
    return render(request, 'main/detail.html', {'my_pics': picture})