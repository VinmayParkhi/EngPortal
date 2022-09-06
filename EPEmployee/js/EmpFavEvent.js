 var CurrentDate;
 var EventID;
 
  $(document).ready(function() {

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
    $("div.pastevntsCard.Wellbeing").removeClass("d-none");
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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=EventId,Attachments,EventTitle,Pillar,AverageRating,EventDescription&$expand=AttachmentFiles&$filter=AuthorId eq "+userId+"&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            console.log("before for databefore for data",data.d.results);
            for (var i = 0; i <= dataresults.length; i++) {                
                 var pillar= data.d.results[i].Pillar;
                 var EventTitle= data.d.results[i].EventTitle;
                 var EventDescription= data.d.results[i].EventDescription;  
                 var AverageRating  = data.d.results[i].AverageRating;   	 
               	 //var VideoURLs = data.d.results[i].VideoURL;                
               	// var a =  "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl;
                 $(".FavEvntsWr").append('<div class="pastevntsCard '+pillar+'" style="width:30%; margin:10px 10px 2rem 10px"><div class="pstvideoImg1"  style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%);background-repeat: no-repeat;background-size: contain;"> <label class="time">15:03</label>'+
                            '<a href="iframeData" id="iframeData" class="play">'+
                                '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 2834.svg" alt="Play"> </a>'+
                            '<a href="#" onclick="heartImage(this.id,pillar['+i+']);" id="" class="heartImg"> <img id="heartImg" src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon feather-heart.svg" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"> <h5 id="popuprate-h5">'+AverageRating+'</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="1" lblId ="popuprate-h5" class="reviewPopup" href="#" class="reviewPopup" lblId = "popuprate-h5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
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



/*
function test() {

 	var iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');

 	var dialog = $("#iframeHolder").append(iframe).appendTo("body").dialog({

 		autoOpen: false,

 		modal: true,

 		resizable: false,

 		width: "auto",

 		height: "auto",

 		close: function () {

 			iframe.attr("src", "");

 		}

 	});
 	}
 $("#iframeData").on("click", function (e) {

 	e.preventDefault();

 	var src = $(this).attr("href");

 	var title = $(this).attr("data-title");

 	var width = $(this).attr("data-width");

 	var height = $(this).attr("data-height");

 	iframe.attr({

 		width: +width,

 		height: +height,

  		src: src

 	});

 	dialog.dialog("option", "title", title).dialog("open");

  });*/



function heartImage(clicked_id,pillar){
	
	//EventID = $(this).document.getElementById("EventId");
	//console.log("EventID:"+EventID);	
	//$("#eID").val();
		
	alert(clicked_id);	
	//alert("Test",EventID);
	FavEvents(clicked_id,pillar);
}


function FavEvents(clicked_id,pillar){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		//var EventID = $("#eID").val();
  	
	
  	var item={
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
		alert("Sucessfully updated");
	}

    function OnError(data){
		alert("Update error");
	}
  };
