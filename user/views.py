from django.shortcuts import render, redirect
from .models import UserModel
from django.contrib.auth import get_user_model # db 내에 사용자 확인
from django.contrib import auth, messages
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

# Create your views here.
def sign_up(request):
    if request.method == 'POST':
        # 화면상 입력받는 값 순서대로 선언
        #pw1 과 pw2 유효성 검사는 프론트에서 하는 게 나을 것 같아서 안씀
        email = request.POST.get('email', '')
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')

        # 중복된 email을 갖고 있는 사람이 있는지 확인
        exist_user = get_user_model().objects.filter(email=email)
        if exist_user:
            # pass
            return redirect('/', {'error':'사용자가 이미 존재합니다.'})
        else:
            UserModel.objects.create_user(email=email, username=username, password=password)
            return redirect('/')
    else:
        # pass
        return render(request, 'user/sign.html')

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email', '')
        password = request.POST.get('password', '')
        me = auth.authenticate(request, email=email, password=password)
        if me is not None: # 일치하는 user가 있다면
            auth.login(request, me)
            return redirect('/main')


        else: # 일치하는 user가 없다면
            messages.add_message(request, messages.WARNING, '이메일 혹은 패스워드가 맞지 않습니다.')
            return render(request, 'user/login.html')

    else:
        # pass
        return render(request, 'user/login.html')

# 로그아웃
@login_required
def logout(request):
    auth.logout(request)  # 인증 되어있는 정보를 없애기
    return redirect("/")