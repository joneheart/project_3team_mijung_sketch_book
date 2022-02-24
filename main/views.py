from django.shortcuts import render, redirect
from .models import BasePicture
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def home(request):
    if request.method == 'GET':
        pictures = BasePicture.objects.all()

        picture_list = []

        for p in pictures:
            print(p.enl_title)
            print(p.author)
            print(p.year)
            print(p.intro)

            # 영어 제목에서 ' 제거해서 보내주기
            p.enl_title = p.enl_title.replace("’",'')

            picture_list.append(p)


        return render(request, 'main/index.html', {'pictures' : picture_list})



# 선택한 파일 이름, 업로드 한 파일 받기
def upload(request):
    pass





# AI 서버와 통신RH
def result(request):
    pass
