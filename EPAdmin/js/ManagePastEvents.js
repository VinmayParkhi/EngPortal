var Work = 0;
var Life = 0;
var Wellbeing = 0;
var WowPride = 0;
var ConnectCommunity = 0;
var log = console.log;


var minDate, maxDate;
 

$(document).ready(function() {
	/*$("#minValue, #maxValue").datepicker({ 
		dateFormat: 'dd M, yy',
		changeMonth: true,
		changeYear: true,
		minDate: "-1Y", 
		maxDate: "+1Y",
		yearRange: "1900:2100"
		
		 $('#arrow-img').on("mouseover",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg").removeClass("d-none");
    $("#myImg").css("display","block");

  });     
  $('#arrow-img').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg").addClass("d-none");
  })
		
	});
	
	$( "#minValue" ).datepicker( "setDate", -365);
	$( "#maxValue" ).datepicker( "setDate", -1);*/
	
	
		 $('#arrow-img').on("mouseover",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg").removeClass("d-none");
    $("#myImg").css("display","block");

  });     
  $('#arrow-img').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg").addClass("d-none");
  })
	  
  
  /*sb start*/

   var fromDateCh;
    $("#minValue").datepicker({
      dateFormat: "dd M, yy",

      onSelect: function (dateText) {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('DD/MM/YYYY')
                
                log(fromDateCh);
                
            }
    });
    
   
    $("#maxValue").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                var toDateCh = moment(date2).format('DD/MM/YYYY')
                //log(fromDate)
                var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$orderby = Created desc";
                  //var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
               console.log(url);        

     $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
              log(data)
              //log(fromDate)
              //log(date2)
              
              
              //var frmdt = new Date(fromDate);
              var filterData = [];
              
              for(var k=0;k<res.length;k++){
                  var eventDt = res[k].EventDate;
                   var Edate = moment(eventDt).format('DD/MM/YYYY')
                   //var newEdate = new Date(Edate);
                   //log(Edate)
                    log(fromDateCh )
                    log(toDateCh)
                    log(Edate )
                   //log(fromDate == Edate)
                  if(Edate >= fromDateCh && Edate <= toDateCh){
                      //alert('date matched');
                      filterData.push(res[k]);
                      log(res[k]);
                      
                      
                   }/* if end*/
                   
              }/*for end*/
              successFuncFltr(filterData);
            }/*success end*/
            
            });
         }
    });
  /*sb end*/  

  
  
	
	var min = $("#minValue").val();
	min = moment(min).toISOString();
	var max = $("#maxValue").val();
	max = moment(max).toISOString()
	$.noConflict();
	var today= moment().toISOString();
	loadListItems(min,max);    
});


function loadListItems(min,max) {
	var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";
	//var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= (EventEndTime le '"+max+"')and (EventEndTime ge '"+min+"')&$orderby = EventDate desc";
	var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter= (EventEndTime le '"+moment().toISOString()+"')&$orderby = EventDate desc";
	//var url = siteurl+ "/_api/web/lists/getbytitle('TestList')/items?&$select=*";
	console.log(url);        

    $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                    "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                if(data.d.results.length > 0 ){ 
                  successFunction(data);   
                  
						var dataresults = data.d.results;
				console.log(dataresults);
				$("#Count").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Pillare = data.d.results[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#wrk").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#Life").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#Wow").html(WowPride);
					}else if(Pillare == "Wellbeing"){
						Wellbeing++;
						console.log("Wellbeing"+Wellbeing);
						$("#Wellbeing").html(Wellbeing);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#Connect").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
		                                              
                }
            },
            error: errorFunction
	});      
}


function errorFunction(data){
//console.log(error);
}


function successFunction(data) {

               var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	console.log(data);

	var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

        try {

                var dataTableExample = $('#dataTable6').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#dataTable6').DataTable({  
                     scrollY: '70vh',
		       		 scrollCollapse: true,
                
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },

                    pagingType:'simple_numbers',
                    

                    autoWidth: true,
					deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {"mData": "ID"},

                        //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:11px !important;font-weight: 400 !important;height:2% !important;">'+row.Title+'</h6>'; }
						},

                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date1 = new Date(data);
                                     var month = moment.utc(date1).format('DD MMM,YYYY');
                                     var text = date1.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return month ;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }

                        },
          
						{"mData": "Status"},
						
						{
													
							"render": function(data, type, row, meta ) {              
							return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px; margin-left:67%;"><div id="editbox"><div class="replacevideo"><div class="subboxvid"><i class="fa-solid fa-upload" style="color:black;font-size: 8px;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i><span>Replace Video</span></div></div> <div class="embedlink"><div class="subboxvid"><a href="https://www.youtube.com" style="color:black;font-size:8px;text-decoration:none;"><i class="fas fa-external-link-square-alt"></i><span>Embed Link</span></a></div></div> <div class="trash"><div class="subboxvid"><a href="https://www.youtube.com" style="color:black;font-size:8px;text-decoration:none;"><i class="fas fa-trash-alt"></i><span>Remove Video</span></a></div></div></div></div>'; 
							}
						},
                     ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}



function replaceVideo(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog("https://infornt.sharepoint.com/sites/RNTENG/Lists/EPEvent/EditForm.aspx?ID="+id);    
    //window.location.reload();        
}

function openDialog(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Replace Video',
        allowMaximize: false,
        showClose: true,
        width: 500,
        height: 300
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}



/*sb start*/
function successFuncFltr(fltrData){
    log(fltrData)
    
    var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	//console.log(data);

	var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

        try {

                var dataTableExample = $('#dataTable6').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#dataTable6').DataTable({  
                     scrollY: '70vh',
		       		 scrollCollapse: true,
                
					language: {
                    search: "",
                    searchPlaceholder: "Search",
                    lengthMenu: "Show _MENU_ Entries"
                },

                    pagingType:'simple_numbers',
                    

                    autoWidth: true,
					deferRender:true,                       

                    lengthMenu: [10,50,100, 200, 500],                       

                    "aaData": fltrData,

                        "aoColumns": [                      

                        {"mData": "ID"},

                        //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:14px !important;font-weight: 400 !important;height:2% !important;">'+row.Title+'</h6>'; }
						},

                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date1 = new Date(data);
                                     var month = moment.utc(date1).format('DD MMM,YYYY');
                                     var text = date1.toString();
                                     const myArray = text.split(" ");
                                     var mnt = myArray[1];
                                     var time = myArray[4];
                                     return month ;
                                    //return date.getDate()+" "+(month.toString().length > 1 ? month : "0" + month)+ "," + date.getFullYear();
                                }

                        },
          
						{"mData": "Status"},
						
						{
													
							"render": function(data, type, row, meta ) {              
							return '<div id="temp" onclick="showimg(this)"><img id="threedot"  src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/ENG-Admin/images/threedot.png" style="width:40px; margin-left:67%;"><div id="editbox">+<a class="ms-4"><i class="" style="color:black;" id="" onclick="RemoveListItem('+row.ID+')"/></a></div></div>'; 
							}

						},
                     ]

                });

            }

            catch (e) { 

        alert(e.message); 

    }

}/*sb end*/


//$("#createSurvey").on("click", function(){
 //location.href = "https://infornt.sharepoint.com/SitePages/ENG_Admin/Admin_Create_Survey.aspx";
 
 //}
function showimg(x) {
  var x = x.querySelector('#editbox');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

