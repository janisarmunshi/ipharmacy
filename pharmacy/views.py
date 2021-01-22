from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .models import Greeting, company_Master

# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, "index.html")


def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, "db.html", {"greetings": greetings})

def login_request(request):
    global LoginComp
    if request.method == "POST":
        form = AuthenticationForm(request,data=request.POST)      
        
        if form.is_valid():
            print('isvalid')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            LoginComp = request.POST.get('dropdown')
            user = authenticate(username=username, password = password)            
            print(LoginComp)

            if user is None: 
                messages.error(request, 'Invalid username or password')
            else:
                login(request, user)                                
                return redirect('/home')
        else:
            messages.error(request, 'Invalid username or password')

    lstComps = company_Master.objects.all()
    form = AuthenticationForm()
    context = {"form": form, "lstComp":lstComps}    
    return render(request, 'login.html', context)
