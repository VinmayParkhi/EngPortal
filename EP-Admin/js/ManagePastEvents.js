var Work = 0;
var Life = 0;
var Enrich = 0;
var WowPride = 0;
var ConnectCommunity = 0;
var NotUpload=0;
var Uploaded=0;
var log = console.log;
var statusText2 = ""; 
var datesSelected ="";
var minDate, maxDate;
 

$(document).ready(function() {
$('.head-left').click(function() {
             history.go(-1);        
    });
    
     $("#okayw").click(function() { 
    window.location.href = "https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/ManagePastEvent.aspx";         
   });

		 $('#arrowimg').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg").removeClass("d-none");
    $("#myImg").css("display","block");

  });     
  $('#arrowimg').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg").addClass("d-none");
  });
  
	 $('#arrimg2').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg2").removeClass("d-none");
    $("#myImg2").css("display","block");

  });     
  $('#arrimg2').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg2").addClass("d-none");
  });
  
  $(".player").attr('data-toggle',"modal");
  $(".player").attr('data-target',"#exampleModal");
  
  
  var fromDateCh;
   var toDateCh;
  
  
  /*sb start*/
    
  var pillarFilterArray = [];
  $("#wrkLi,#LifeLi,#WellbeingLi,#WowLi,#ConnectLi,#CountLi").on("click",function(event){
  
  $("#NotUploaded").html(0);
  $("#Uploaded").html(0);
  var siteurl = "https://amdocs.sharepoint.com/sites/EP";

    pillarFilterArray = [];
   var text = event.target.innerText
  //log(text.includes('Work'));
  log(text)
  
  if(fromDateCh !== undefined && toDateCh !== undefined && statusText2.length > 0){
      var selectedPillar = event.target.className;
      alert(selectedPillar)
       var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed') and "+datesSelected+" and Pillar eq '"+selectedPillar+"' &$orderby=ID desc";                  
     
  }else{
  
     var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed')&$orderby=ID desc";                  
                            console.log(url);        
}
     $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {

                if(data.d.results.length > 0 ){ 
                    var res = data.d.results;
                    
                    for(var f=0;f<res.length;f++){
                        if(text.includes(res[f].Pillar)){
                        
                         pillarFilterArray.push(res[f])
                          //log(res[f])
                        }else if(text.includes("All")){
                           pillarFilterArray.push(res[f])
                        
                        }

                                                
                    }; /* for end */
                    var NotUpload=0;
					var Uploaded=0;

                    
                    for(var i =0; i< pillarFilterArray.length; i++){
				var Status= pillarFilterArray[i].VideoURL;
					if(Status == null){
						NotUpload++;
						//console.log("Scheduled"+Scheduled);
						$("#NotUploaded").html(NotUpload);
					}else{
						Uploaded++;
						//console.log("Autopublished"+Upload);
						$("#Uploaded").html(Uploaded);
					}				//var Status;
				}

                    successFuncFltr(pillarFilterArray)
                     var popup = $(".popuptext");
                     popup.removeClass("show");

                }
              }  
    });  /* ajax end */
  
});


$("#AllCountLi,#PublishedLi").on("click",function(event){
     var statusText = event.target.innerText
     
     log(statusText)
     var statusFilterArray = [];
     
     var siteurl = "https://amdocs.sharepoint.com/sites/EP";
     //alert(fromDateCh !== undefined && toDateCh !== undefined)
     if(fromDateCh !== undefined && toDateCh !== undefined){     
             statusText2 = event.target.innerText
             //alert(statusText2)
               var url =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed') and "+datesSelected+"&$orderby=ID desc";
             //var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed') and "+datesSelected+"&$orderby=ID desc";
             alert(url)
    }else{
         var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed')&$orderby=ID desc";

    }
    $.ajax({
           url: url,
           type: "GET",
           dataType: "json",
           headers: {
                    "accept": "application/json;odata=verbose"
            },

           success: function (data) {
          if(data.d.results.length > 0 && pillarFilterArray.length === 0){
                    log(data)
                    var res = data.d.results;
                    
                    for(var f=0;f<res.length;f++){
                        if(statusText.includes("Uploaded") && !statusText.includes("Not")){
                           // log(text.includes("Uploaded"))
                            if(res[f].VideoURL !== null){
                               statusFilterArray.push(res[f])
                            }                         
                        }else if(statusText.includes("Uploaded") && statusText.includes("Not")){
                            if(res[f].VideoURL === null){
                                 statusFilterArray.push(res[f])

                            } 
                           
                        };

                      };
                   }else if(pillarFilterArray.length > 0){
                       
                        for(var t=0;t<pillarFilterArray.length;t++){
                        
                          if(statusText.includes("Uploaded") && !statusText.includes("Not")){
                           // log(text.includes("Uploaded"))
                            if(pillarFilterArray[t].VideoURL !== null){
                               statusFilterArray.push(pillarFilterArray[t])
                            }                        
                        }else if(statusText.includes("Uploaded") && statusText.includes("Not")){
                            if(pillarFilterArray[t].VideoURL === null){
                                 statusFilterArray.push(pillarFilterArray[t])

                            } 
                           
                        };
                        
                        }/* for end */
         
                 }
                 
                 log(statusFilterArray)
                      successFuncFltr(statusFilterArray)
                       var popup = $(".popuptext");
                     popup.removeClass("show");

                 }
             });     
               
    });



   
   
    $("#minValue").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function () {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('YYYY-MM-DD');
                
             if(toDateCh !== undefined){
              $("#wrk").html(0);
				$("#life").html(0);
				$("#Enri").html(0);
				$("#Wow").html(0);
				$("#Connect").html(0);


                $("#Uploaded").html(0);
				$("#NotUploaded").html(0);
				


                    var Work = 0;
					var Life = 0;
					var Enrich = 0;
					var WowPride = 0;
					var ConnectCommunity = 0;
					var NotUpload=0;
					var Uploaded=0;

                var fromDateString = "";                  
                                
                fromDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	            datesSelected =  "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);
            }
            
            });
            }else if(fromDateCh !== undefined && toDateCh === undefined){
              var fromDateString = "";                  
                                
                fromDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'";
	               
	           
                 log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+fromDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            successFunction(data);
            }
            
            });

            }
 
          }
    })
    
    
     
    
   
    $("#maxValue").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                toDateCh = moment.utc(date2).format('YYYY-MM-DD')
                
                if(fromDateCh !== undefined){
                
                 $("#wrk").html(0);
				$("#life").html(0);
				$("#Enri").html(0);
				$("#Wow").html(0);
				$("#Connect").html(0);


                $("#Uploaded").html(0);
				$("#NotUploaded").html(0);
				


                    var Work = 0;
					var Life = 0;
					var Enrich = 0;
					var WowPride = 0;
					var ConnectCommunity = 0;
					var NotUpload=0;
					var Uploaded=0;

                var toDateString = "";
                                
                toDateString = "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	             datesSelected =  "EventDate ge " + "'"+fromDateCh+"T00:00:00Z'" + " and EventDate le " + "'"+toDateCh+"T12:00:00Z'";

	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            
            $("#Count").html(res.length);
				for(var i =0; i< res.length; i++){
				var Pillare = res[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#wrk").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#life").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#Wow").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Enrich"+Enrich);
						$("#Enri").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity++;
						console.log("ConnectCommunity"+ConnectCommunity);
						$("#Connect").html(ConnectCommunity );					

					}


				}
				
				for(var i =0; i< res.length; i++){
				var Status= res[i].VideoURL;
					if(Status == null){
						NotUpload++;
						//console.log("Scheduled"+Scheduled);
						$("#NotUploaded").html(NotUpload);
					}else{
						Uploaded++;
						//console.log("Autopublished"+Upload);
						$("#Uploaded").html(Uploaded);
					}				//var Status;
				}
            successFunction(data);  
            }
            
            });
            }else if(toDateCh !== undefined && fromDateCh === undefined){
              var toDateString = "";
                                
                toDateString = "EventDate le " + "'"+toDateCh+"T12:00:00Z'";
	               
	           
                 //log(fromDateString)
                var siteurl = "https://amdocs.sharepoint.com/sites/EP";

                  var url = siteurl+ "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter="+toDateString+"&$orderby = Created desc";           
              // alert(url)
               
               $.ajax({

            url: url,

            type: "GET",

            dataType: "json",

            headers: {
                    "accept": "application/json;odata=verbose"
            },

            success: function (data) {
            var res = data.d.results;
            log(res)
            
            


            successFunction(data);  
            }
            
            });

            }

         }
    });
    
    
    $("#minValue, #maxValue").on('keyup',function(){
       var val = $(this).val();
      // log(val);
       if(val.length === 0){
        $("#minValue, #maxValue").on('keyup',function(){
        var val = $(this).val();
       //log(val);
        if(val.length === 0){
        //alert('empty')
        loadListItems()
        }
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
    var today= moment().format('YYYY-MM-DDTHH:mm:SS');
	//var siteurl = "https://infornt.sharepoint.com/sites/RNTENG";
	//var url = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('EPEvent')/items";
	var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items?&$top=5000&$select=*,Author/Title&$expand=Author&$filter=(EventStatus eq 'Completed')&$orderby=ID desc";
	
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
                var dataresults = data.d.results;
                console.log(dataresults.length);
                  successFunction(data);   
                  
						
				
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
						$("#life").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#Wow").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Enrich"+Enrich);
						$("#Enri").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity++;
						console.log("ConnectCommunity"+ConnectCommunity);
						$("#Connect").html(ConnectCommunity );					

					}


				}
				
				
				var dataresults = data.d.results;
				console.log(dataresults);
				for(var i =0; i< dataresults.length; i++){
				var Status= data.d.results[i].VideoURL;
					if(Status == null){
						NotUpload++;
						//console.log("Scheduled"+Scheduled);
						$("#NotUploaded").html(NotUpload);
					}else{
						Uploaded++;
						//console.log("Autopublished"+Upload);
						$("#Uploaded").html(Uploaded);
					}				//var Status;
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

	var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#dataTable6').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#dataTable6').DataTable({  
                     scrollY: '94vh',
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
                    columnDefs: [ { target: 1,               
                    			    visible: false,                
                    			    searchable: false,
                    			   }
                    		  ],


                    "aaData": data.d.results,

                        "aoColumns": [   
                                           
							{
                        	"render": function(data, type, row, meta ){
                        		return meta.row + 1
                        	}                        
                        },      
                        {"mData": "ID"},

                        //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'2">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:11px !important;font-weight: 400 !important;height:2% !important;">'+row.Title+'</h6>'; }
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
          
						//{"mData": "EventStatus"},
						{
													
							"render": function(data, type, row, meta ) {    
								var VideoUrl = row.VideoURL;
								
								log(VideoUrl)
								if(VideoUrl == null){
									//alert("Uploaded Not");
									return '<span><img src="../../SiteAssets/ENG-Admin/Images/exclamation-triangle.svg" class="not-up"></img> Not Uploaded</span>'; 
								}else{
									return '<span>Uploaded</span><p><a id = "'+VideoUrl+'" class="col-12 play player" data-toggle="modal" data-target="#exampleModal" onclick="getVid(id)"> <img src="../../SiteAssets/ENG-Admin/Images/Group 3278.svg"></img></a> Watch<p>';
									//alert("Uploaded Done");	
									
							
								}

							
							}
						},

												
						{
													
							"render": function(data, type, row, meta ) {    
								var VideoUrl = row.VideoURL;
								console.log(VideoUrl);
								if(VideoUrl == null){
									//alert("Uploaded Not");
									return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:30px; margin-left:85%;"><div id="editbox"><div class="replacevideo"><div class="subboxvid" style="padding: 5px 0px 5px; " style="cursor: pointer;" onclick="UploadVideo(this.id)" id="'+row.ID+'"><i  class="fa-solid fa-upload" style="cursor: pointer;color:black;font-size: 8px;"></i><span style="cursor: pointer;height: 10px" >Upload Video</span></div></div><div class="subboxvid"><a href="#" style="color:black;font-size:8px;text-decoration:none; padding-top:5px;"><i class=""></i><span></span></a></div></div> <div class="trash" style="width: 100%;display: flex;align-items: center;justify-content: space-around;"><div class="subboxvid"></div></div></div></div></div>'; 
								}else{
									return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:30px; margin-left:85%;"><div id="editbox" style=padding: 10px 0;"><div class="subboxWr"><div class="replacevideo" style="padding: 5px 0px 5px; "><div class="subboxvid" style="cursor: pointer;" onclick="replaceVideo(this.id)" id="'+row.ID+'"><i class="fa-solid fa-upload" style="color:black;font-size: 8px;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i><span>Replace Video</span></div></div><div class="trash" style="width: 100%;display: flex;align-items: center;justify-content: space-around;"><div class="subboxvid" onclick="removeVideo(this.id)"  id="'+row.ID+'" style="padding-top: 5px; "data-bs-toggle="modal" data-bs-target="#managepastvideodelete" ><a href="#" style="color:black;font-size:8px;text-decoration:none;"><i class="fas fa-trash-alt"></i><span>Remove Video</span></a></div></div></div></div></div>'; 									
									//alert("Uploaded Done");								
								}
							
							}
						},
                     ]

                });

            }

            catch (e) { 

        //alert(e.message); 

    }

}

function getVid(url){
	//alert(url)
	$(".modalapp iframe").attr('src',url);
	
	
	}


function replaceVideo(id){
debugger;
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
      //$("#part1 > table.ms-formtable > tbody > tr:nth-child(16) > td.ms-formbody > span > input").html("text"); 
    openDialogreplace( "https://amdocs.sharepoint.com/sites/EP/Lists/EPEvent/EditForm.aspx?ID="+id);    
    //window.location.reload();        
}


function removeVideo(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"VideoURL":" ",
  		//"AutoPublishDate" : ""
  	}
	//console.log(data);
	$.ajax({
		url: siteUrl,
		type: "POST",
		async:false,
		data: JSON.stringify(item),
		headers: {
				"accept": "application/json;odata=verbose",
				"content-type": "application/json;odata=verbose",
				"X-RequestDigest": $("#__REQUESTDIGEST").val(),
				"IF-MATCH": "*",           
				"X-HTTP-Method": "MERGE"

		},
		success: SuccessFunction,
		error: ErrorFunction
	});
}

function SuccessFunction(data) {
//alert("test done");
//window.location.href = 'https://amdocs.sharepoint.com/sites/EP/SitePages/EPAdmin/ManagePastEvent.aspx';

}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}



function openDialogreplace(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Replace Video',
        allowMaximize: false,
        showClose: true,
        width: 500,
        height: 150
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}

function UploadVideo(id){
debugger;
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog( "https://amdocs.sharepoint.com/sites/EP/Lists/EPEvent/EditForm.aspx?ID="+id);    
    //window.location.reload();        
}

function openDialog(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Upload Video',
        allowMaximize: false,
        showClose: true,
        width: 500,
        height: 150
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}




/*sb start*/
function successFuncFltr(fltrData){


               $("#wrk").html(0);
				$("#life").html(0);
				$("#Enri").html(0);
				$("#Wow").html(0);
				$("#Connect").html(0);


                $("#Uploaded").html(0);
				$("#NotUploaded").html(0);
				


                    var Work = 0;
					var Life = 0;
					var Enrich = 0;
					var WowPride = 0;
					var ConnectCommunity = 0;
					var NotUpload=0;
					var Uploaded=0;
                    
                $("#Count").html(fltrData.length);
				for(var i =0; i< fltrData.length; i++){
				var Pillare = fltrData[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#wrk").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#life").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#Wow").html(WowPride);
					}else if(Pillare == "Enrich"){
						Enrich++;
						console.log("Enrich"+Enrich);
						$("#Enri").html(Enrich);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity++;
						console.log("ConnectCommunity"+ConnectCommunity);
						$("#Connect").html(ConnectCommunity );					

					}


				}
				
				
				
				for(var i =0; i< fltrData.length; i++){
				var Status= fltrData[i].VideoURL;
					if(Status == null){
						NotUpload++;
						//console.log("Scheduled"+Scheduled);
						$("#NotUploaded").html(NotUpload);
					}else{
						Uploaded++;
						//console.log("Autopublished"+Upload);
						$("#Uploaded").html(Uploaded);
					}				//var Status;
				}

		                                              
            

    log(fltrData)
    
    var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	//console.log(data);

	var siteurl ="https://amdocs.sharepoint.com/sites/EP";

        try {

                var dataTableExample = $('#dataTable6').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }
                
 



                dataTableExample = $('#dataTable6').DataTable({  
                     scrollY: '94vh',
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
                    columnDefs: [ { target: 1,               
                    			    visible: false,                
                    			    searchable: false,
                    			   }
                    		  ],
                      

                    "aaData": fltrData,

                        "aoColumns": [     
                         {
                        	"render": function(data, type, row, meta ){
                        		return meta.row + 1
                        	}                        
                        },                       

                        {"mData": "ID"},

                        //{"mData": "Title"}, 
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'2">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:11px !important;font-weight: 400 !important;height:2% !important;">'+row.Title+'</h6>'; }
						},

                        
  						 {"mData": "EventDate",

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
          
						{
													
							"render": function(data, type, row, meta ) {    
								var VideoUrl = row.VideoURL;
								
								log(VideoUrl)
								if(VideoUrl == null){
									//alert("Uploaded Not");
									return '<span><img src="../../SiteAssets/ENG-Admin/Images/exclamation-triangle.svg" class="not-up"></img> Not Uploaded</span>'; 
								}else{
									return '<span>Uploaded</span><p><a id = "'+VideoUrl+'" class="col-12 play player" data-toggle="modal" data-target="#exampleModal" onclick="getVid(id)"> <img src="../../SiteAssets/ENG-Admin/Images/Group 3278.svg"></img></a> Watch<p>';
									//alert("Uploaded Done");	
									
							
								}

							
							}
						},
						
						{
													
							"render": function(data, type, row, meta ) {    
								var VideoUrl = row.VideoURL;
								console.log(VideoUrl);
								if(VideoUrl == null){
									//alert("Uploaded Not");
									return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:30px; margin-left:85%;"><div id="editbox"><div class="subboxWr"><div class="replacevideo"><div class="subboxvid" style="padding: 10px 0px 5px; border-bottom:1px solid #000;" style="cursor: pointer;" onclick="UploadVideo(this.id)"><i  class="fa-solid fa-upload" style="cursor: pointer;color:black;font-size: 8px;" id="'+row.ID+'"></i><span style="cursor: pointer;" >Upload Video</span></div></div><div class="subboxvid"><a href="#" style="color:black;font-size:8px;text-decoration:none; padding-top:5px;"><i class=""></i><span></span></a></div></div> <div class="trash" style="width: 100%;display: flex;align-items: center;justify-content: space-around;"><div class="subboxvid"></div></div></div></div></div>'; 
								}else{
									return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:30px; margin-left:85%;"><div id="editbox" style=padding: 10px 0;"><div class="subboxWr"><div class="replacevideo" style="padding: 10px 0px 5px; border-bottom:1px solid #000;"><div class="subboxvid" style="cursor: pointer;" onclick="replaceVideo(this.id)"><i class="fa-solid fa-upload" style="color:black;font-size: 8px;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i><span>Replace Video</span></div></div><div class="trash" style="width: 100%;display: flex;align-items: center;justify-content: space-around;"><div class="subboxvid" style="padding-top: 5px; data-bs-toggle="modal" data-bs-target="#managepastvideodelete" id="'+row.ID+'"><a href="#" style="color:black;font-size:8px;text-decoration:none;"><i class="fas fa-trash-alt"></i><span>Remove Video</span></a></div></div></div></div></div>'; 									
									//alert("Uploaded Done");								
								}
							
							}
						},
                     ]

                });

            }

            catch (e) { 

        //alert(e.message); 
    }

}/*sb end*/


//$("#createSurvey").on("click", function(){
 //location.href = "https://infornt.sharepoint.com/SitePages/ENG_Admin/Admin_Create_Survey.aspx";
 
 //}
 /* sb start */
 
 function showEditBox(x){
         
         //x.style.cursor = "pointer";
         trHover =  x.parentNode.parentNode.parentNode;     
          
         var x = x.querySelector('#editbox');
         log(x)
		    x.style.display = "flex";
		    
           removeEditBox(trHover,x);

};

function removeEditBox(tr,x){
   tr.onmouseout = function(){      
		    x.style.display = "none";       

   };
};


$('#Watch').on('shown.bs.modal', function () {
  $('#Watch').trigger('focus')
})
/* sb end */


