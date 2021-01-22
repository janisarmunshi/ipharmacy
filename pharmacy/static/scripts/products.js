
var flagContent = false, 
    lstContent;

function addRow() {
    var table = document.getElementById('tblProdBatch');
    var rowCount = table.rows.length;
    var columnLength = table.getElementsByTagName('tr')[0].children.length;
    var units = document.getElementsByClassName('unit-table');
    var tr = document.createElement('tr');
    var msgAlert = "";
    tr.className = 'unit-table';

    for(var i = 0; i < columnLength; i++){
      var td = document.createElement('td');
      var text = document.createElement('input');
      
      var txtid = '__r'+rowCount+'c'+(i+1);
      text.id = txtid;
      switch(i)
      {
            case 0:
                
                text.type = 'text';
                text.style = "text-align:left; width:200px;";   
                text.className = "arTableInput arC1 "; 
                break;        
            case 1:
                
                text.type = 'text';
                text.style = "text-align:right; width:120px;";
                text.className = "arTableInput arC2 "; 
                break; 
            case 2:
                
                text.type = 'text';
                text.style = "text-align:right; width:120px;";
                text.className = "arTableInput arC3 "; 
                break; 
            case 3:
                
                text.type = 'text';
                text.style = "text-align:right; width:120px;";
                text.className = "arTableInput arC4 "; 
                break; 
            case 4:
                
                text.type = 'date';
                text.style = "text-align:right; width:140px;";    
                text.className = "arTableInput arC5 "; 
                break; 
            case 5:
                
                text.type = 'date';
                text.style = "text-align:right; width:140px;";  
                text.className = "arTableInput arC6 "; 
                break; 
            case 6:
                
                text.type = 'text';
                text.style = "text-align:right; width:100px;";            
                text.className = "arTableInput arC7 "; 
                break; 
            case 7:
                
                text.type = 'text';
                text.style = "text-align:right; width:100px;";     
                text.className = "arTableInput arC8 "; 
                break; 
            case 8:
                
                text.type = 'text';
                text.style = "text-align:right; width:100px;";     
                text.className = "arTableInput arC9 "; 
                break; 
            case 9:
                
                text.type = 'text';
                text.style = "text-align:left; width:100px;";     
                text.className = "arTableInput arC10 "; 
                break; 
            case 10:
                
                text.type = 'text';
                text.style = "text-align:right; width:100px;";    
                text.className = "arTableInput arC11 arLastCol"; 
                break; 
                                                  
      }
      
      td.appendChild(text);
      tr.appendChild(td);
    }
    table.appendChild(tr);
    $('#__r'+rowCount+'c1').focus();
  }

$(document).keyup(function (event) {

    event.preventDefault();

});

$(document).ready(function () {



    $("#txtHSNCode").keyup(function (event) {
        var i = event.keyCode;

        if (i == 115) {
        //   event.preventDefault();
          showHelp("txtHSNCode", event, "listContent", document.getElementById("txtcsrf").value);
          
        }
      });


      $(document).on("blur",'.arLastCol', function(e) {

            var $td = jQuery(this).closest('td'),
                $tr = $td.closest('tr');
            var rowIndex = jQuery("#tblProdBatch tr").index($tr);
            
            var colIndex = $tr.find("td").index($td);
            var rowCount = document.getElementById("tblProdBatch").rows.length;
            
            if (rowCount-1 <= rowIndex){
                var validateID1 = '__r'+ rowIndex + 'c1',
                    validateID2 = '__r'+ rowIndex + 'c2';
                    
                    
                if( document.getElementById(validateID1).value.length == 0 && document.getElementById(validateID2).value.length == 0){
                    $('#submit').focus();
                }
                else{
                    
                    addRow();
                        // document.getElementById("tblProdBatch").insertRow(-1).innerHTML = '<tr><td><textarea name ="Question" placeholder="Question" th: field = "${questionAnswerSet.question}" id="question" style = "resize: none; width:100%;"></textarea></td><td><textarea name="Answer" placeholder ="Answer" th: field = "${questionAnswerSet.answer}" id="answer" style="resize:none;width: 100%;"></textarea></td ></tr>';
                            
                }
            }
            // var colCount = document.getElementById("myTable").rows[0].cells.length;

      });


      $(document).on("blur",'.arC2', function(e) {
        var $td = jQuery(this).closest('td'),
        $tr = $td.closest('tr');
        var rowIndex = jQuery("#tblProdBatch tr").index($tr);
        
        var colIndex = $tr.find("td").index($td);
        var rowCount = document.getElementById("tblProdBatch").rows.length;
        
        if (rowCount-1 <= rowIndex){
            var validateID1 = '__r'+ rowIndex + 'c1',
                validateID2 = '__r'+ rowIndex + 'c2';
                console.log('id1:' + validateID1  + ' id2:' + validateID2);
                
            if( document.getElementById(validateID1).value.length == 0 && document.getElementById(validateID2).value.length == 0){
                $('#submit').focus();
            }
        }
      }); 

});



$('body').on('keydown', 'input, select', function(e) {
    if (e.key === "Enter") {
        console.log(e);
        var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
        focusable = form.find('input,a,select,button,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this)+1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }

});

function showAlert(message, wait=3000) {
    var myWindow = window.open("", "myWindow", "width=400, height=100");
    myWindow.document.write("<p>"+message + "</p>");
    setTimeout(function(){ myWindow.close() }, wait);
  }
  
function productSave(){
    var flgValid = validateForm();
    if (flgValid){

        var Rows = document.getElementById('tblProdBatch').rows.length-1,
            Cols = document.getElementById('tblProdBatch').getElementsByTagName('tr')[0].children.length;    
            
            var validateID1 = '__r'+ Rows + 'c1',
                validateID2 = '__r'+ Rows + 'c2';
                
            if( document.getElementById(validateID1).value.length == 0 && document.getElementById(validateID2).value.length == 0){
                Rows =  Rows - 1;
            }
            
        var dataIn = {
            prodCode: $('#txtProductCode').val(), 
            prodName: $('#txtProductName').val(),
            prodSName: $('#txtShortName').val(),
            prodBarcode: $('#txtBarcode').val(),
            prodContent: $('#optContent').val(),
            prodVendorRef: $('#txtVendorRef').val(),
            prodGSTName: $('#txtGSTName').val(),
            prodGSTUnit: $('#txtGSTUnit').val(),
            prodSchedule: $('#txtSchedule').val(),
            prodHSNCode: $('#txtHSNCode').val(),
            prodCategory: $('#optCategory').val(),
            prodSubCat: $('#optSubcategory').val(),

            prodClass: $('#txtClass').val(),
            prodPacking: $('#txtPacking').val(),
            prodBUOM: $('#BUOM').val(),
            prodConvBUnit: $('#txtConvBaseUnit').val(),
            prodConvFact: $('#txtConvFactor').val(),
            prodAUOM: $('#AUOM').val(),
            prodMfgBy: $('#txtMfgBy').val(),
            prodMktBy: $('#txtMktBy').val(),
            prodDivision: $('#txtDivision').val(),
            prodPurchRate: $('#txtPurchRate').val(),
            prodSalesRate: $('#txtSalesRate').val(),
            prodMRP: $('#txtMRP').val(),
            prodDiscount: $('#txtDiscount').val(),
            
            prodSTaxGroup: $('#SalesTaxGrp').val(),
            prodPTaxGroup: $('#PurchTaxGrp').val(),
            prodMinStock: $('#txtMinStock').val(),
            prodMaxStock: $('#txtMaxStock').val(),
            prodMinOrdQty: $('#txtMinOrdQty').val(),
            prodStoreLoc: $('#txtStoreLoc').val(),
            __Rows : Rows,
            __Cols : Cols,
            csrfmiddlewaretoken: $('#txtcsrf').val(),
        }    

        for(var i = 1; i < dataIn.__Rows+1; i++){
            // dataIn.appendChild
            for (var j = 1; j < dataIn.__Cols+1; j++)
            {
                var varcel = '__r'+i+'c'+j;
                console.log('varcel:' + varcel + ', varval:' + varval);
                var varval = document.getElementById(varcel).value;
                    console.log('varcel:' + varcel + ', varval:' + varval);
                dataIn[varcel] = varval ;
            }
        }
        console.log(dataIn);
        response = ajaxCall('arProductSave','POST',dataIn)
        alert('product save');
    }
}

function clearForm(){
    // $('.table input[type="text"]').val('');
    $('#frmProduct')[0].reset();
    $('#txtProductCode').focus();
  
}

function validateForm(){
    
    var frm = $('#frmProduct'), isValid=false;
    isValid = frm[0].checkValidity();
    // if(! $frm[0].checkValidity()) {
    // If the form is invalid, submit it. The form won't actually submit;
    // this will just cause the browser to display the native HTML5 error messages.
        // $frm.find(':submit').click();
    // }
    var prodCode =  $('#txtProductCode').val(), 
    prodName =  $('#txtProductName').val(),
    prodSName = $('#txtShortName').val(),
    prodBarcode = $('#txtBarcode').val(),
    prodContent = $('#optContent').val(),
    // prodVendorRef = $('#txtVendorRef').val(),
    // prodGSTName = $('#txtGSTName').val(),
    // prodGSTUnit = $('#txtGSTUnit').val(),
    // prodSchedule = $('#txtSchedule').val(),
    // prodHSNCode = $('#txtHSNCode').val(),
    prodCategory = $('#optCategory').val(),
    prodSubCat = $('#optSubcategory').val(),

    // prodClass = $('#txtClass').val(),
    prodPacking = $('#txtPacking').val(),
    prodBUOM = $('#BUOM').val(),
    // prodConvBUnit = $('#txtConvBaseUnit').val(),
    // prodConvFact = $('#txtConvFactor').val(),
    // prodAUOM = $('#AUOM').val(),
    // prodMfgBy = $('#txtMfgBy').val(),
    // prodMktBy = $('#txtMktBy').val(),
    // prodDivision = $('#txtDivision').val(),
    prodPurchRate = $('#txtPurchRate').val(),
    prodSalesRate = $('#txtSalesRate').val(),
    prodMRP = $('#txtMRP').val(),
    // prodDiscount = $('#txtDiscount').val(),
    
    prodSTaxGroup = $('#SalesTaxGrp').val(),
    prodPTaxGroup = $('#PurchTaxGrp').val();
    // prodMinStock = $('#txtMinStock').val(),
    // prodMaxStock = $('#txtMaxStock').val(),
    // prodMinOrdQty = $('#txtMinOrdQty').val(),
    // prodStoreLoc = $('#txtStoreLoc').val()
    if (prodSTaxGroup == "" || prodPTaxGroup == "") { msgAlert = "Product Tax is Blank", varEle = "#PurchTaxGrp";  }
    if (prodMRP == "") { msgAlert = "Product MRP is Blank", varEle = "#txtMRP";  }
    if (prodSalesRate == "") { msgAlert = "Product Sales Rate is Blank", varEle = "#txtSalesRate";  }
    if (prodPurchRate == "") { msgAlert = "Product Purch Rate is Blank", varEle = "#txtPurchRate";  }
    if (prodBUOM == "") { msgAlert = "Product UOM is Blank", varEle = "#BUOM";  }
    if (prodPacking == "") { msgAlert = "Product Pack is Blank", varEle = "#txtPacking";  }
    if (prodSubCat == "") { msgAlert = "Product Subcategory is Blank", varEle = "#optSubcategory";  }
    if (prodCategory == "") { msgAlert = "Product Category is Blank", varEle = "#optCategory";  }
    if (prodContent == "") { msgAlert = "Content is Blank", varEle = "#optContent";  }
    if (prodSName == "") { msgAlert = "Product Short Name is Blank", varEle = "#txtShortName";  }
    if (prodName == "") { msgAlert = "Product Name is Blank", varEle = "#txtProductName";  }
    if (prodCode == "") { msgAlert = "Product Code is Blank", varEle = "#txtProductCode";  }
    
    if (msgAlert!= "") { 
        showAlert(msgAlert,4000);
        isValid = false;
        $(varEle).focus();
    }
    console.log(msgAlert);   

}