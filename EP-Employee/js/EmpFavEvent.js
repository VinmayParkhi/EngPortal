 var CurrentDate;
 var EventID;
 var log = console.log;
  $(document).ready(function() {
  $('#FavBack').click(function() {
             history.go(-1);        
    });

    //alert( "ready!" );
    GetPastEvents();
    
    $("#all").on("click", function(){   
    $("div.pastevntsCard").removeClass("d-none");
    });
    $("#work").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Work").removeClass("d-none");
	 //$("div.pastevntsCard.Work").addClass("d-block");
    });
    $("#life").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Life").removeClass("d-none");
	 //$("div.pastevntsCard.Work").addClass("d-block");
    });
    $("#wellbeing").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Enrich").removeClass("d-none");
	 //$("div.pastevntsCard.Work").addClass("d-block");
    });
    $("#wowpride").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Wow").removeClass("d-none");
	 //$("div.pastevntsCard.Work").addClass("d-block");
    });
	$("#connectcommunity").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Connect").removeClass("d-none");
	 //$("div.pastevntsCard.Work").addClass("d-block");
    });


    
   //test();
});

function GetPastEvents() {
	var userId = _spPageContextInfo.userId;
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;
 
    $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,EventID,ImageURL,Title,Pillar,EventDescription&$expand=AttachmentFiles&$filter=AuthorId eq "+userId+"&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            console.log(dataresults);
            console.log("before for databefore for data",data.d.results);
            for (var i = 0; i <= dataresults.length; i++) {                
                 var pillar = data.d.results[i].Pillar;
                 console.log(pillar);
                 var EventTitle= data.d.results[i].Title;
                 var favID = data.d.results[i].ID
                 var EventDescription= data.d.results[i].EventDescription;  
                 var AverageRating  = data.d.results[i].AverageRating;
                 var eventID = data.d.results[i].EventID;   	 
               	 //var VideoURLs = data.d.results[i].VideoURL;                
               	 var a = data.d.results[i].ImageURL;
                 $(".FavEvntsWr").append('<div class="pastevntsCard '+pillar+'" style="width:30%; margin:10px 10px 2rem 10px"><div class="pstvideoImg1"  style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%),url('+a+');background-repeat: no-repeat;background-size: cover;"> <label class="time">15:03</label>'+
                            '<a href="iframeData" id="iframeData" class="play">'+
                                '<img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Play"> </a>'+
                            '<a href="#" onclick="heartImage('+eventID+','+favID+',event);" id="" class="heartImg"> <img id="heartImg" src="../../SiteAssets/ENGEmployee/images/Icon feather-heart.svg" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div></div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '</h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc" style="padding:0px !important;">'+EventDescription+'</span></p> </div> </div> </div>');
                 
                 
                //alert(a);
                /*$(".pstvideoImg1").attr("style","background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%), url("+a+");background-repeat: no-repeat;background-size: contain;");

                
              
                  //alert('EventDates is Past');   */
              

                    }
            console.log(dataresults);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}


function heartImage(clicked_id,id,event){
	
	//EventID = $(this).document.getElementById("EventId");
	//console.log("EventID:"+EventID);	
	//$("#eID").val();
		
	console.log(clicked_id);	
	//console.log(pillar);
	//alert("Test",EventID);
	FavEvents(clicked_id,id,event);
}


function FavEvents(clicked_id,favDelID,event){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		//var EventID = $("#eID").val();
  	
	
  	/*var item={
  	 	"__metadata":{'type': 'SP.Data.FavoriteEventsListItem'},
  	 	"Title": "FavoriteEvents",
   		"EventID":clicked_id,
		"EmpID":EmpId,
		"UserName":username,
		"Pillar":pillar.outerText	
		
  	};
  	console.log(item);
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('FavoriteEvents')/items",
		type: "POST",
		contentType: "application/json; odata=verbose",
		data:JSON.stringify(item),
		headers: {
			"Accept": "application/json; odata=verbose",
			"X-RequestDigest":$("#__REQUESTDIGEST").val(),			
		},
		success:OnSuccess,
		error:OnError
	});
	function OnSuccess(data){
		//alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}*/
	
	
	$.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items(" + favDelID + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) {  
                //alert("Item Deleted " + favDelID);  
                log(event.target.parentElement.parentElement.parentElement);
                var y = event.target.parentElement.parentElement.parentElement;
                y.remove();
            },  
            error: function(data) {  
                //alert("failed");  
            }  
        }); 
  };
