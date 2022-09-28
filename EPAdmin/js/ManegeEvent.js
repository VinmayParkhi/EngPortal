var Work = 0;
var Life = 0;
var Wellbeing = 0;
var WowPride = 0;
var ConnectCommunity = 0;
var log = console.log;
var All = 0;
var Scheduled = 0;
var Autopublished = 0;
var Draft = 0;
var complete = 0;
var minDate, maxDate;
var getPillar;
var rowId;


$(document).ready(function() {
     
     GetAutoPublish()     
   UpDateComplete();

 $('#arrimg').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg").removeClass("d-none");
    $("#myImg").css("display","block");
  });     
  $('#arrimg').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg").addClass("d-none");
  });
  
  
  $('#arrimg3').on("click",function(e){
   //$('#myImg').slideDown(1);
   $("#myImg2").removeClass("d-none");
    $("#myImg2").css("display","block");

  });     
  $('#arrimg3').on("mouseleave",function(e){
   //$('#myImg').slideUp(1);
   $("#myImg2").addClass("d-none");
  });

/*sb start*/

$("#workidLi,#lifeidLi,#wellbeingidLi,#wowidLi,#connectidLi,#AllCountsLi,#AllCountLi,#scheduledLi,#autopublishedLi,#DraftLi,#CompletedLi").on("click",function(event){
   
   var text = event.target.innerText
  //log(text.includes('Work'));
  
  var pillarFilterArray = [];
  
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

                if(data.d.results.length > 0 ){ 
                    log(data)
                    var res = data.d.results;
                    
                    for(var f=0;f<res.length;f++){
                        if(text.includes(res[f].Pillar)){
                        
                         pillarFilterArray.push(res[f])
                          //log(res[f])
                        }else if(text.includes("All")){
                           pillarFilterArray.push(res[f])
                        
                        }else if(text.includes(res[f].EventStatus)){
                           pillarFilterArray.push(res[f]);
                        }else if(text.includes("All Events")){
                           pillarFilterArray.push(res[f])
                        
                        };
                                                
                    }; /* for end */
                    successFuncFltr(pillarFilterArray)
                }
              }  
    });  /* ajax end */
  
});

   var fromDateCh;
   var toDateCh;
   
    $("#from-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var fromDate = $(this).val();
                fromDateCh = moment.utc(fromDate).format('DD/MM/YYYY')
                
                log(fromDateCh);
                
                if(toDateCh !== undefined){
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
                   var Edate = moment.utc(eventDt).format('DD/MM/YYYY')
                   //var newEdate = new Date(Edate);
                   log(Edate)
                    //log(newEdate)
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

                };
                
            }
    });
    
   
    $("#to-date").datepicker({
      dateFormat: "dd M, yy",
      changeMonth: true,
      changeYear: true,

      onSelect: function (dateText) {
                var date2 = $(this).val();
                toDateCh = moment.utc(date2).format('DD/MM/YYYY')
                //log(fromDate)
                
                if(fromDateCh !== undefined){
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
                   var Edate = moment.utc(eventDt).format('DD/MM/YYYY')
                   //var newEdate = new Date(Edate);
                   log(Edate)
                    //log(newEdate)
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
         }
    });
  /*sb end*/  

    
    //$("#from-date").click(function(){
    
    
        //alert(123);
        
      /*  var getTr = document.querySelectorAll("#datatable11 > tbody > tr");
       for(var g=0;g<getTr.length;g++){
       var dates = getTr[g].querySelector('td + td + td').innerText
       var date = new Date(dates); // M-D-YYYY

		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
         var dt = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;  
           log(dt);
       }; for end */
       //log(getTr)
    //});
    $.noConflict();
       loadListItems();   
       
       
       
		  /* minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
        
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });

       
        $('#min, #max').on('change', function() {
        table.draw();
    });*/
 });
    
$("#min, #max").datepicker({ 
dateFormat: 'dd M, yy',
changeMonth: true,
changeYear: true,
minDate: "-0Y", 
maxDate: "+10Y",
yearRange: "1900:2100"  

});


$( "#min" ).datepicker( "setDate", new Date());
$( "#max" ).datepicker( "setDate", 31);


/*$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[4] );
 
        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);
*/

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

                var dataTableExample = $('#datatable11').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable11').DataTable({   
              language: {
                    search: "",
                    searchPlaceholder: "Search"
                },

                 
				scrollY: '100vh',
        scrollCollapse: true,
                    

                    pagingType:'simple_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,25, 50,100, 200, 500],                       

                    "aaData": fltrData,

                        "aoColumns": [                      

                        {"mData": "ID"},
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:12px !important;font-weight: 600 !important; height:2%">'+row.Title+'</h6>'; }
						},

                        
                       // {"mData": "Pillar"},

                       // {"mData": "EventDescription"}, 
                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM, YYYY hh:mm a')
                                     allDates(date);
                                     log(date);
                                    return date;
                                }

                        },
                        {
						    "render": function(data, type, row, meta ) {  
						    var Excited = row.Exited;
						    var NotExcited = row.NotExcited;
						    var NotSure = row.NotSure;
						    
						    if(Excited == null ){
						    	Excited = "-";
						    }
						    if (NotExcited == null ){
						    	NotExcited = "-";
						    }
						    if (NotSure == null ){
						    	NotSure = "-";
						    }


						    return '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+Excited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+NotExcited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+NotSure+'<span>';      
							}   
						  },  
     
						
						//{"mData": "Status"}, 
          
						//{"mData": "EventSpeakerName"},
						
						 {
							"render": function(data, type, row, meta ) {          
								var PublishDate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
								var Status = row.EventStatus;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.EventStatus+'">'+row.EventStatus+"<br>"+PublishDate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.EventStatus+'">'+row.EventStatus+'</span>';
								}
							}
						},

						
						{
							/*"render": function (data, type, row, meta)
		                      {
		                          var setUrl = "https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID="+row.ID
		                          console.log(setUrl);
		                         // var result = '<a class="fa fa-pencil" onclick="PopupForm(\'' + setUrl + '\')"></a>'
		                         // var result = "<a class='fa fa-pencil' onclick='PopupForm("'https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID=11'")'></a>"
		                          return result;
		                      }*/
		                      
						
							"render": function(data, type, row, meta ) {  
							var statusColumn = row.EventStatus;   
							if(statusColumn == "Published"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Completed"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="#"><i class="fa-solid fa-upload" style="color:black;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i></a><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="#" style="color:black;" id="editbtn"></i></a><a class="me-3"><i class="#" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Draft"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a>+<a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
							}else{
							return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a>+<a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
						}
						}
						},
						/*{
			                mData: null,
			                className: "dt-center editor-edit",
			                //defaultContent: '<a class="fa fa-pencil" href="VM/Details/' + data + '">' + row.Activity_Id + '</a>',
			                orderable: false
			            },*/
			           						
						/*{ title: "", "defaultContent": "<button onclick='edititem();'>Edit</button>" },
             			{ title: "", "defaultContent": "<button onclick='deleteitem();'>Delete</button>" }*/
						//{"mData": "Category"},

                      
                       

                     ]

                });

            }

            catch(e) { 

        alert(e.message); 

    }

}/*sb end*/

/*sb start*/
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

/* sb end */


function loadListItems() {

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

                if(data.d.results.length > 0 )

                 { 

                  successFunction(data);   
                  
					var dataresults = data.d.results;
				console.log(dataresults);
				$("#AllCounts").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Pillare = data.d.results[i].Pillar;
					if(Pillare == "Work"){
						Work++;
						console.log("Work"+Work);
						$("#workid").html(Work);
					}else if(Pillare == "Life"){
						Life++;
						console.log("Life"+Life);
						$("#lifeid").html(Life);
					}else if(Pillare == "Wow and pride"){
						WowPride++;
						console.log("WowPride"+WowPride );
						$("#wowid").html(WowPride);
					}else if(Pillare == "Wellbeing"){
						Wellbeing++;
						console.log("Wellbeing"+Wellbeing);
						$("#wellbeingid").html(Wellbeing);
					}else if(Pillare == "Connect and Community"){
						ConnectCommunity ++;
						console.log("ConnectCommunity "+ConnectCommunity );
						$("#connectid").html(ConnectCommunity );
					}else{
						//Others++;
						//console.log("Others"+Others);
					}
				//var Status;
				}
				
				
				var dataresults = data.d.results;
				console.log(dataresults);
				$("#AllCount").html(dataresults.length);
				for(var i =0; i< dataresults.length; i++){
				var Status= data.d.results[i].EventStatus;
					if(Status == "Published"){
						Scheduled++;
						console.log("Scheduled"+Scheduled);
						$("#scheduled").html(Scheduled );
					}else if(Status== "Autopublish"){
						Autopublished++;
						console.log("Autopublished"+Autopublished);
						$("#autopublished").html(Autopublished);
					}else if(Status == "Draft"){
						Draft++;
						console.log("Draft"+Draft);
						$("#Draft").html(Draft);
					}else if(Status == "Completed"){
						complete++;
						console.log("complete"+complete);
						$("#Completed").html(complete);
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


function adduser(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog( "../../Lists/TeamsNotificationList/NewForm.aspx?EventID="+id);    
    //window.location.reload();        
}

function openDialog(pageUrl) {
    var options = {
        url: pageUrl,
        iconImageUrl: "icons/request.png",
        title: 'Share event with people you want',
        allowMaximize: false,
        showClose: true,
        width: 450,
        height: 200
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}


function replaceVideo(id){
    //openDialog(currsite+'/_layouts/15/aclinv.aspx?GroupId='+CurrGroupId);
    openDialog( "../../Lists/EPEvent/EditForm.aspx?ID="+id);    
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



function errorFunction(data){
console.log(error);
}

 $('#datatable11').DataTable({})

      


function successFunction(data) {
                 
               var today1 = new Date();

               var dd1 = String(today1. getDate()). padStart(2, '0');

               var mm1 = String(today1. getMonth() + 1). padStart(2, '0'); //January is 0!

               var yyyy1 = today1. getFullYear();                                           

               var time = today1.getHours() + "_" + today1.getMinutes() + "_" + today1.getSeconds();

               today1 = dd1 + '_' + mm1 + '_' + yyyy1 + '_' +time;



	//console.log(data);
	
	var siteurl ="https://infornt.sharepoint.com/sites/RNTENG";

        try {

                var dataTableExample = $('#datatable11').DataTable();

                if (dataTableExample != 'undefined') {

                    dataTableExample.destroy();

                }



                dataTableExample = $('#datatable11').DataTable({   
              language: {
                    search: "",
                    searchPlaceholder: "Search"
                },

                 
				scrollY: '100vh',
        scrollCollapse: true,
                    

                    pagingType:'simple_numbers',

                    autoWidth: true,

                    deferRender:true,                       

                    lengthMenu: [10,25, 50,100, 200, 500],                       

                    "aaData": data.d.results,

                        "aoColumns": [                      

                        {"mData": "ID"},
                        
                        {
							"render": function(data, type, row, meta ) {              
							return '<h7 id="event-pillar" class="'+row.Pillar+'">'+row.Pillar+'</h7></br><h6 class="event-desc" style="font-size:12px !important;font-weight: 600 !important; height:2%">'+row.Title+'</h6>'; }
						},

                        
                       // {"mData": "Pillar"},

                       // {"mData": "EventDescription"}, 
                        
  						 {"mData": "EventStartTime",

                            "render": function(data) {
                                     var date = new Date(data);
                                     date = moment.utc(date).format('DD MMM, YYYY hh:mm a')
                                     allDates(date);
                                     log(date);
                                    return date;
                                }

                        },
                        {
						    "render": function(data, type, row, meta ) {  
						    var Excited = row.Exited;
						    var NotExcited = row.NotExcited;
						    var NotSure = row.NotSure;
						    
						    if(Excited == null ){
						    	Excited = "-";
						    }
						    if (NotExcited == null ){
						    	NotExcited = "-";
						    }
						    if (NotSure == null ){
						    	NotSure = "-";
						    }


						    return '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3265.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+Excited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Icon ionic-md-sad.svg" alt="not available" style="margin:0px 5px; width:10%;"><span>'+NotExcited+
						    '<span><img src= "../../SiteAssets/ENG-Admin/images/Group 3266.svg" alt="not available" style="margin:0px 5px; width:10%;">'+NotSure+'<span>';      
							}   
						  },  
     
						
						//{"mData": "Status"}, 
          
						//{"mData": "EventSpeakerName"},
						
						 {
							"render": function(data, type, row, meta ) {          
								var PublishDate = moment.utc(row.AutoPublishDateTime).format('DD MMM, YYYY hh:mm a');
								var Status = row.EventStatus;
								if(Status == "Autopublish"){
									return '<span id="event-pillar" class="'+row.EventStatus+'">'+row.EventStatus+"<br>"+PublishDate+'</span>';
								}else{
									return '<span id="event-pillar" class="'+row.EventStatus+'">'+row.EventStatus+'</span>';
								}
							}
						},

						
						{
							/*"render": function (data, type, row, meta)
		                      {
		                          var setUrl = "https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID="+row.ID
		                          console.log(setUrl);
		                         // var result = '<a class="fa fa-pencil" onclick="PopupForm(\'' + setUrl + '\')"></a>'
		                         // var result = "<a class='fa fa-pencil' onclick='PopupForm("'https://infornt.sharepoint.com/Lists/CreateEve/EditForm.aspx?ID=11'")'></a>"
		                          return result;
		                      }*/
		                      
						
							"render": function(data, type, row, meta ) {  
							var statusColumn = row.EventStatus;   
							if(statusColumn == "Published"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a><a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Completed"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href="#"><i class="fa-solid fa-upload" style="color:black;" onclick="replaceVideo(this.id)" id="'+row.ID+'"></i></a><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="#" style="color:black;" id="editbtn"></i></a><a class="me-3"><i class="#" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></a></div></div>';
						
							}else if(statusColumn == "Draft"){
								return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a>+<a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
							}else{
							return '<div id="temp" onmouseover = "showEditBox(this)"><img id="threedot"  src= "../../SiteAssets/ENG-Admin/images/threedot.png" style="width:50px;"><div id="editbox"><a href= "../../SitePages/Admin/edit_event.aspx?EventID='+row.ID+'"><i class="fa fa-pencil me-3" style="color:black;" id="editbtn"></i></a>+<a class="me-3"><i class="fa fa-trash" style="color:black;" id="Remove-Btn" onclick="RemoveListItem('+row.ID+')"/></i></a><a href="#"><i class="fa-solid fa-paper-plane" style="color:black;" onclick="adduser(this.id)" id="'+row.ID+'"></i></a></a></div></div>';
						}
						}
						},
						/*{
			                mData: null,
			                className: "dt-center editor-edit",
			                //defaultContent: '<a class="fa fa-pencil" href="VM/Details/' + data + '">' + row.Activity_Id + '</a>',
			                orderable: false
			            },*/
			           						
						/*{ title: "", "defaultContent": "<button onclick='edititem();'>Edit</button>" },
             			{ title: "", "defaultContent": "<button onclick='deleteitem();'>Delete</button>" }*/
						//{"mData": "Category"},

                      
                       

                     ]

                });

            }

            catch(e) { 

        alert(e.message); 

    }
}

/*function action(){
	
	 $(".actionDIv").append("<span class='actionhover'><a href='https://infornt.sharepoint.com/sites/RNTENG/SitePages/Admin/create_event.aspx?EventID="+rowId+"'><i class='fa-solid fa-pen'></i></a><i class='fa-solid fa-trash'></i><i class='fa-solid fa-rocket'></i></span>");
		//alert("test");
	   console.log("testing ok");
	   
	}
*/

function allDates(dat){
   log(dat)
};

function PopupForm(url) {
alert(url);
            alert("value of url " + url);
            var formDiv = $('<div/>');
            $.get(url).done(function (response) {
                formDiv.html(response);

                Popup = formDiv.dialog({
                    autoOpen: true,
                    resizable: false,
                    title: 'fill details',
                    height: 500,
                    width: 700,
                    close: function () {
                        Popup.dialog('destroy').remove();
                    }
                });
            });
        }
        
        
        
        
        $("#editbtn").on("click",function(){
        
        getPillar= $(this).parent(tr).find("#event-pillar").text();
        alert("pillar:-",getPillar);
        });
 /*********************************************************************************************/
    
var listName = "EPEvent";   
  
function RemoveListItem(myID) {  
    //var myID = $("#emp-id").val();  
            
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + myID  + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) {  
                alert("Item Deleted " +myID);  
            },  
            error: function(data) {  
                alert("failed");  
            }  
        });  
     
} 





/***********************************************************************************/
/*$(".action").on("click", function(){
 

  //function() {
	alert('hover succes');
   // $( this ).append( $( "<span class='actionhover' style='background-color:red;'><a  href=' '><i class='fa-solid fa-pen'></i></a><i class='fa-solid fa-trash'></i><i class='fa-solid fa-rocket'></i></span>" ) );

  //}, function() {

  //  $( this ).find( ".actionhover" ).last().remove();

  //}

});*/


/*function showimg(x) {
  var x = x.querySelector('#editbox');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}*/



setInterval(GetAutoPublish, 10000);

function GetAutoPublish() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,EventStatus,AutoPublishDateTime&$filter=(EventStatus eq 'Autopublish') and ( AutoPublishDateTime le '"+today+"')&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate =data.d.results[0].AutoPublishDateTime;               
               var Status = data.d.results[0].EventStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdatePublish(ID);
           			}	                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdatePublish(EVid) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+EVid+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"EventStatus":"Published"
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
alert("test done");

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}


setInterval(UpDateComplete, 45000);

function UpDateComplete() {
 	var today = moment().format('YYYY-MM-DDTHH:mm:00'); 	
 	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,EventStatus,EventEndTime&$filter=(EventStatus eq 'Published') and ( EventEndTime le '"+today+"')&$orderby=Created desc",   
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var dataresults = data.d.results;
            console.log(dataresults);
				if(dataresults.length > 0){
               var AutoPublishDate = data.d.results[0].EventEndTime;               
               var Status = data.d.results[0].EventStatus;
               		var ID = data.d.results[0].ID;
               		console.log(AutoPublishDate +" "+ Status +" "+ ID);
               UpdateCompleted(ID);
           }		                 
        },
        error: function (xhr, status, error) {
            //console.log("Failed");
        }
    });
}

function UpdateCompleted(id) {
	var siteUrl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPEvent')/items("+id+")"
	var item = {
		__metadata: { 'type': 'SP.Data.EPEventListItem' },
  		"EventStatus":"Completed",
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

//$("#divCreateListResults").html(data.d.Title + " successfully created!");-->
}

function ErrorFunction(error) {
alert('Error!' +error.responseText);
}

