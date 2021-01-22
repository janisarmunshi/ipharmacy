
// function focusFunction() {
//   document.getElementById("txtProduct").style.backgroundColor = "yellow";
//   }
  
//   function blurFunction() {
//   document.getElementById("txtProduct").style.backgroundColor = "red";
//   }
  
//   function keyupFunction(event) {
  
//   document.getElementById("txtProduct").style.backgroundColor = "yellow";
//   }

let retData; 
function ajaxCall(ipUrl, callType = "POST", dataIn) {
 
  return $.ajax({
    url: ipUrl,
    type: callType,
    data: dataIn,
    async: false,
    dataType: "json",
    success: function (response) {
      // alert('success');
      // return response;             
    },
    error: function (err) {
      alert("fail" + JSON.stringify(err));
    }, //error
  });
  //alert('in js'+ retData);
  //return retData;     
}
function ajaxCallChar(ipUrl, callType = "POST", dataIn) {
 console.log(dataIn);
  return $.ajax({
    url: ipUrl,
    type: callType,
    data: dataIn,
    async: false,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {     
      return response;             
    },
    error: function (err) {
      // console.log(err);
    }, //error
  });

}

function showAlert(message, wait=3000) {
  var myWindow = window.open("", "myWindow", "width=400, height=100");
  myWindow.document.write("<p>"+message + "</p>");
  setTimeout(function(){ myWindow.close() }, wait);
}

function buildSelect(optName, optDefault, optExclude,fieldID='id',fieldText='Text') {  
  
  lstUOM = ajaxCallChar( 'listUOM_Ajax','GET',)
  
  data = lstUOM.responseJSON.data;
  
  var optElement = document.getElementById(optName);  
  var colCount = optElement.options.length;
  for (i = colCount-1; i>=0; i--)
  {
    optElement.options[i] = null;
  }
  
  var option = document.createElement("option");      
  option.text = "";
  option.value = "" ;
  optElement.add(option);
  colCount = data.length;
  for (i = 0; i < colCount; i++) {
    if (data[i].id != optExclude)
    {
      var option = document.createElement("option");      
      option.text = data[i][fieldText] ;
      option.value = data[i][fieldID] ;
      if (option.text == optDefault)
      {
        option.selected = true;
      }
      optElement.add(option);
    }
    // btable.columns(i).header().to$().text(colDef[i].column_Lable);
  }

 
}

