var checkHelp,
    searchText = "",
    searchText_x = "",
    currRowIndx = 0,
    searchColIdx = 0;
// var rcounter = -1;
var selectedField = "";
var tblHdr = [];
var selectedData;
var helpTable;
var helpElement;

function returnHelpText(element, textValue) {

    var elementType = document.getElementById(element).type;
    switch (elementType) {
        case "text":
            document.getElementById(element).value = textValue;
        case "button":
            document.getElementById(element).innerHTML = textValue;
        default:
            document.getElementById(element).value = textValue;
    }
}

function showHelp(element, event, ajaxUrl, csrftoken,jsondata="") {
    helpElement = element;
    event.preventDefault();
    var i = event.keyCode;
    var colCount = 0;
    console.log('url:' + ajaxUrl);
    if (i == 115) {
        checkHelp = 1;
        var tData = { action: 'getColHeader',}         

        var colHeading = ajaxCallChar('listContentColHead','GET',tData);
 
        var colDef = colHeading.responseJSON.data;
        console.log(colDef);
        tblHdr = colDef;
        if (jsondata=== ""){
            var table = $("#help").DataTable({
                retrieve: true,
                select: {
                    style: 'single'
                },
                ajax: {
                    url: ajaxUrl,
                    type: 'POST',
                    dataType: 'json',                
                    // async: false,
                    data: {
                        csrfmiddlewaretoken: csrftoken,
                    },
                },
                // destroy:true,
                // select: true,
                tabIndex: 0,
                keys: {
                    focus: ":eq(0)",
                },
                columns: [
                    { data: tblHdr[0].column_Header },
                    { data: tblHdr[1].column_Header },
                    // { data: tblHdr[2].column_Header },
                    // { data: tblHdr[3].column_Header },
                    // { data: tblHdr[4].column_Header },
                    // { data: tblHdr[5].column_Header },
                    
                ],
            });
        }
        else {

            var table = $("#help").DataTable({
                retrieve: true,
                select: {
                    style: 'single'
                },
                data: jsondata.data,   //get the array of object data
                // destroy:true,
                // select: true,
                tabIndex: 0,
                keys: {
                    focus: ":eq(0)",
                },
                columns: [
                    { data: tblHdr[0].column_Header },
                    { data: tblHdr[1].column_Header },
                    { data: tblHdr[2].column_Header },
                    { data: tblHdr[3].column_Header },
                    { data: tblHdr[4].column_Header },
                    { data: tblHdr[5].column_Header },
                    
                ],
            });
        }

    }


    helpTable = table;      
    colCount = tblHdr.length;
    

    for(i=0; i<colCount; i++)
    {
         helpTable.columns(i).header().to$().text(tblHdr[i].column_Lable); 
        // console.log(helpTable.column(i).dataSrc());
    }
    document.getElementById("lblSearch").innerHTML = tblHdr[searchColIdx].column_Lable;
    $("#showModal").trigger("click");    
    // console.log(helpTable);
}


$(document).ready(function () {

    $("#help").on("key-focus", function (e, datatable, cell) {
        datatable.rows().deselect();
        datatable.row(cell.index().row).select();

        //var data = table.cell( { focused: true } ).data();
    });



    $("#txtSearch").on("keyup", function (ev) {
        //          table
        //              .columns( 1 )
        //             .search( this.value )
        //             .draw();
        if (ev.ctrlKey && ev.key == "ArrowRight") {
            searchColIdx += 1;
            if (searchColIdx > tblHdr.length - 1) {
                searchColIdx = tblHdr.length - 1;
            }
            document.getElementById("lblSearch").innerHTML = tblHdr[searchColIdx].column_Lable;
            helpTable.columns(searchColIdx).search(this.value).draw();
        } else if (ev.ctrlKey && ev.key == "ArrowLeft") {
            searchColIdx -= 1;
            if (searchColIdx < 0) {
                searchColIdx = 0;
            }

            document.getElementById("lblSearch").innerHTML = tblHdr[searchColIdx].column_Lable;
            helpTable.columns(searchColIdx).search(this.value).draw();
        } else {
            let tmp = '0';
            // var tmpIdx = 0;
            var info;

            var rowsDisplay = 0;
            info = helpTable.page.info();
            rowsDisplay = info.recordsDisplay - 1;
            if (rowsDisplay > 9) {
                rowsDisplay = 9;
            }

            searchText = this.value;
            if (searchText_x != searchText) {
                helpTable.columns(searchColIdx).search(searchText).draw();

                searchText_x = searchText;
                currRowIndx = 0;
                // tmpIdx = 0;
                // rcounter = -1;
            }

            if (ev.key == "ArrowDown") {
                // rcounter = -1;
                currRowIndx += 1;
                if (currRowIndx > rowsDisplay) {
                    currRowIndx = rowsDisplay;
                }

            }

            if (ev.key == "ArrowUp") {
                // rcounter = -1;
                currRowIndx -= 1;
                if (currRowIndx < 0) {
                    currRowIndx = 0;
                }

            }

            // helpTable.rows().every(function () {                
            // rcounter += 1;
            helpTable.rows().deselect()
            // });

            helpTable.row(':eq(' + currRowIndx + ')', { page: 'current' }).select();
            // helpTable.rows().every(function () {                
            //     rcounter += 1;

            //     selectedField = helpTable.rows(rcounter).data()[0][helpTable.column( searchColIdx ).dataSrc()];                

            //     helpTable.rows(rcounter).deselect()               

            //     if (selectedField.toLowerCase().includes(searchText.toLowerCase())) {
            //         alert('Incl: currowidx:' + currRowIndx + ',countr:' + rcounter + ',tmpidx:' + tmpIdx);
            //         if (currRowIndx == tmpIdx) {                        
            //             helpTable.rows(tmpIdx).select()
            //             //alert('selected: ' + currRowIndx );

            //         }                 
            //         tmpIdx += 1;
            //     }
            //     else{
            //         alert('Excl: currowidx:' + currRowIndx + ',countr:' + rcounter + ',tmpidx:' + tmpIdx);
            //     }

            // });
        }
    });

    // $("#help").DataTable({----
    //     dom: "<<t>plf>", // wrapper <DOM> => <t> shows table and before that letter at top and after that letter shows in bottome
    // });
    //$('#help').DataTable();

    $(document).on("keydown", function (ev) {
        if (ev.keyCode == 112) {
            ev.preventDefault();
            //$("#Aview2").dialog("open");
        }
    });

    $("#help tbody").on("click", "tr", function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            helpTable.$("tr.selected").removeClass("selected");
            $(this).addClass("selected");
        }
    });

    //handling double click
    $("#help tbody").on("dblclick", "tr", function () {
        if (checkHelp == 1) {
            document.getElementById("txtProduct").value = this.cells[0].innerHTML;
        }
        checkHelp = 0;
        $("#hideModal").trigger("click");
    });
    //end handling double click

    $("#help tbody").on("keyup", "tr", function (event) {
        if (event.keyCode == 13) {

            var selectedData = helpTable.rows(".selected").data().toArray();
            returnHelpText(helpElement, selectedData[0][helpTable.column(0).dataSrc()]);
            // document.getElementById("txtProduct").value = selectedData[0][helpTable.column( 0 ).dataSrc()]; //this.cells[0].innerHTML;

            checkHelp = 0;
            $("#hideModal").trigger("click");
        }
    });

});

$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        var helpTable = $("#help").DataTable();
        var selectedData = helpTable.rows(".selected").data().toArray();

        if (checkHelp == 1) {
            returnHelpText(helpElement, selectedData[selectedData.length - 1][helpTable.column(0).dataSrc()]);
            // document.getElementById("txtProduct").value = selectedData[selectedData.length - 1][helpTable.column( 0 ).dataSrc()];

        }
        checkHelp = 0;
        $("#hideModal").trigger("click");
    }
});
