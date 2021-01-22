from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .models import Greeting, company_Master, columnHeader, product_Category, product_Subcategory, UOM, Tax_Group, content_Master, product_Master
from random import randint

# Create your views here.
LoginComp = 0
def index(request):
    global LoginComp
    if LoginComp == 0:
        LoginComp = 1

    obj = company_Master.objects.get(id=LoginComp)
    context = {"compName": obj.company_Name }    
    return render(request, 'index.html', context) 

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

def logout_request(request):
    logout(request)
    # messages.info(request,'Logged out...')
    gbimage = '/images/bye' + str(randint(1,5)) + '.jpg'
    return render(request, 'logout.html',{"gbimage":gbimage})

def getColHeader(request):
       
    if request.is_ajax and request.method == 'POST':
        modelHdr = request.POST['model']
        colHdrs = list( columnHeader.objects.filter(table_name=modelHdr).values().order_by(column_sort) )

        return JsonResponse({ 'data': colHdrs }, safe = False)        

def products(request):

    lstCategory = product_Category.objects.all()
    lstSubcat = product_Subcategory.objects.all()
    lstUOM = list(UOM.objects.all())
    lstTax = list(Tax_Group.objects.order_by().values('Tax_GrpCd','Tax_Group').distinct())
    lstContent = list(content_Master.objects.all())
    context = {'category':lstCategory,'subcateg':lstSubcat,'UOM':lstUOM, 'TaxGroup':lstTax, 'Content':lstContent}
    return render(request, 'products.html', context)

def listContent(request):
    if request.is_ajax and request.method == 'POST':
        # objContent = list(content_Master.objects.extra(
        #     select = {'Id': 'id', 'Text': 'content_Name'}
        #     ).values('Id', 'Text' ).annotate(top_count=Count('id')).order_by('-id')[:9664])

        objContent = list(content_Master.objects.all().values('id','content_Name'))

        return JsonResponse({ 'data': objContent }, safe = False)  

def listContentColHead(request):
    print('CALLED')
    if request.is_ajax and request.method == 'GET' :
        print('colhead')
        contentCol =  list(columnHeader.objects.filter(table_name='Content').values().order_by('column_sort')) #.order_by('column_sort')         
        return JsonResponse({ 'data': contentCol }, safe = False)  

def listUOM_Ajax(request):
    if request.is_ajax and request.method == 'GET':
        # lstUOM = list(UOM.objects.all().values('id','UOM_Code'))

        lstUOM = list(UOM.objects.extra(
        select={
            'id': 'id',
            'Text': 'UOM_Code'
        }
        ).values(
        'id',
        'Text'
        ))  

        return JsonResponse({ 'data': lstUOM }, safe = False)  

def dyncolheader(request):
       
    if request.is_ajax and request.method == 'GET':
        print('ajax call')          
        if request.GET.get('action') == 'getHeader':       
            colHdrs = list(columnHeader.objects.filter(table_name='supplier').values())

            # hdrText = []
            # for colHdr in colHdrs:                
            #     text = colHdr
            #     hdrText.append(text)
            
            # json_hdrText = json.dumps(hdrText)  
            return JsonResponse({ 'data': colHdrs }, safe = False)        

    return render(request, 'dyncolheader.html') 

def arProductSave(request):
    if request.is_ajax and request.method == 'POST':  
        print(request.POST['prodCode'])
       
        objBUOM = UOM.objects.get(id=int(request.POST['prodBUOM'])) 
        objPCat = product_Category.objects.get(id= int(request.POST['prodCategory']))
        objPSCat = product_Subcategory.objects.get(id = int(request.POST['prodSubCat']))
        objContent = content_Master.objects.get(id=int(request.POST['prodContent']))

        newProd = product_Master (
            product_Code     = request.POST['prodCode'],
            product_Name     = request.POST['prodName'],
            product_SName    = request.POST['prodSName'],
            product_Barcode  = request.POST['prodBarcode'],
            product_Content  = objContent,
            product_VendRef  = request.POST['prodVendorRef'],
            product_GSTName  = request.POST['prodGSTName'],
            product_GSTUnit  = request.POST['prodGSTUnit'],
            product_Schedule = request.POST['prodSchedule'],
            product_HSNCode  = request.POST['prodHSNCode'],
            product_Category = objPCat,
            product_SubCat   = objPSCat,
            product_Class    = request.POST['prodClass'],
            product_Pack     = request.POST['prodPacking'],
            product_BUOM     = objBUOM,
            product_MfgBy    = request.POST['prodMfgBy'], 
            product_MktBy    = request.POST['prodMktBy'],
            product_Division = request.POST['prodDivision'],
            product_PuRate   = request.POST['prodPurchRate'],
            product_SaleRate = request.POST['prodSalesRate'],
            product_MRP      = request.POST['prodMRP'],
            product_Discount = request.POST['prodDiscount'],
            product_PTaxGrp  = request.POST['prodPTaxGroup'], 
            product_STaxGrp  = request.POST['prodSTaxGroup'],
            product_MinStk   = request.POST['prodMinStock'],
            product_MaxStk   = request.POST['prodMaxStock'],
            product_MinOrd   = request.POST['prodMinOrdQty'],
            Product_Location = request.POST['prodStoreLoc']
        )

        Prod = product_Master.objects.filter(product_Code=request.POST['prodCode']).first()
        if Prod:
            newProd.id = Prod.id

        newProd.save()

        if newProd.id :
            if request.POST['prodAUOM'] != '' and request.POST['prodConvBUnit'] != '' and request.POST['prodConvFact'] != '':
                objAUOM = UOM.objects.get(id=int(request.POST['prodAUOM'])) 
                if objAUOM.id:
                    newPAUOM = product_AUnit (
                        product = newProd,
                        product_BQty   = request.POST['prodConvBUnit'],
                        product_Factor = request.POST['prodConvFact'],
                        product_AUOM   = objAUOM          
                    )
                    newPAUOM.save()


        tblRows = int(request.POST['__Rows'])
        tblCols = int(request.POST['__Cols'])

        for Row in range(1,tblRows+1):
            newBatch = product_Batch (product = newProd)

            for Col in range(1,tblCols+1):
                cell = '__r' + str(Row) + 'c' + str(Col)
                if Col == 1:
                    newBatch.product_Batch = request.POST[cell]
                elif Col == 2:
                    newBatch.product_PuRate = request.POST[cell]
                elif Col == 3:
                    newBatch.product_SaleRate  = request.POST[cell]
                elif Col == 4:
                    newBatch.product_MRP       = request.POST[cell]
                elif Col == 5:
                    newBatch.product_MfgDate   = request.POST[cell]
                elif Col == 6:
                    newBatch.product_ExpDate   = request.POST[cell]
                elif Col == 7:
                    newBatch.product_Discount  = request.POST[cell]
                elif Col == 8:
                    newBatch.product_OPStock   = request.POST[cell]
                elif Col == 9:
                    newBatch.product_OPRate    = request.POST[cell]
                elif Col == 10:
                    newBatch.product_UOM       = objBUOM 
                elif Col == 11:
                    newBatch.product_CLStock   = request.POST[cell]
            newBatch.save()

        return JsonResponse({ 'prodID': newProd.id }, safe = False) 
