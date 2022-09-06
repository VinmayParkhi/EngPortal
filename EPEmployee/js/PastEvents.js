 var CurrentDate;
 var EventID;
 var testdata
 var log = console.log;
 var reviewID;
 var starRating = 0;
var EventDescription;
var getReviewText;
var getRating;
var getRatingCount;
var userName;
var userEmail;


  $(document).ready(function() {
  
  /* sb */
  
    /*$(".reviewPopup").on("click", function(){
    	alert("test");
    	showReviewList();
    });*/
        
        //var testdata;
        
        $(".submitBtn").on('click',function () {        
         getReviewText = document.querySelector('div.reviewBox > div.reviewTextarea > textarea').value;
         
         if(starRating === 0 && (getReviewText === '' || null)){
             alert('Please rate an Event');
         }else{
         //getEPlistData();
         createListItem();
         }
        
        });
        
        
        
        $(".reviewPopup").on('click',function (event) { 
            
                //setTimeout(showReviewList, 5000);  
                            
                var rateA = $("#" + $(this).attr("lblId")).text().split(' ');
                $("#rateno-label").text(rateA[0]);
                $("#baseon-label").text('Based on ' + rateA[1].match(/\d+/) + ' review');
                ratings.ratestar = rateA[0];
                
                
                var textArea = document.querySelector('div.reviewBox > div.reviewTextarea > textarea');
                textArea.value= '';
         
                log(getReviewText)
                getRatings();
            });
            
            
            $("#star1").click(function() {  
              $("#star1").removeClass("fa-regular");
              $("#star1").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star2, #star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star2, #star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

              starRating = 1;
              log(1);
              
  
          });  
          $("#star2").click(function() {  
              //$(".fa-star").css("color", "black");  
              //$("#star1, #star2").css("color", "orange"); 
              $("#star1, #star2").removeClass("fa-regular");
              $("#star1, #star2").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

              starRating = 2; 
              log(2);
  
          });  
          $("#star3").click(function() {  
              $("#star1, #star2, #star3").removeClass("fa-regular");
              $("#star1, #star2, #star3").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              
              $("#star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

 
              starRating = 3;
              log(3);
  
          });  
          $("#star4").click(function() {  
              $("#star1, #star2, #star3, #star4").removeClass("fa-regular");
              $("#star1, #star2, #star3, #star4").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
              $("#star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
              $("#star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});
              starRating = 4;
              log(4);
  
          });  
          $("#star5").click(function() {  
              $("#star1, #star2, #star3, #star4, #star5").removeClass("fa-regular");
              $("#star1, #star2, #star3, #star4, #star5").addClass("fa-solid").css({'font-size':'18px','color':'orange','cursor':'pointer'});
 
              starRating = 5;
              log(5);
  
          });
     /* sb E */ 
     
  
        
    GetPastEvents();
   //test();
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

});

function GetPastEvents() {
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;
    $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,EventDate,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            //console.log("before for databefore for data",data.d.results);
            for (var i = 0; i < dataresults.length; i++) {
                var EventDates = moment(data.d.results[i].EventDate).format('YYYY-MM-DD');              	 
                var EventId = data.d.results[i].ID;
                var pillar= data.d.results[i].Pillar;
                var EventTitle= data.d.results[i].Title;
                var EventDescription= data.d.results[i].EventDescription;
               	var AverageRating = data.d.results[i].AverageRating;               	 
               	var VideoURLs = data.d.results[i].VideoURL;
                if (AverageRating == null){
               		AverageRating = 0;
                }
                var d = new Date();
			    var month = d.getMonth()+1;
			    var day = d.getDate();
			    CurrentDate = d.getFullYear() + '-' + ((''+month).length<2 ? '0' : '') + month + '-' + ((''+day).length<2 ? '0' : '') + day;
			    //console.log(CurrentDate);
			    
			    if(CurrentDate > EventDates)
                 {
                  var a =  "https://infornt.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl;

                 $(".pastEvntsWr").append('<div class="pastevntsCard '+pillar+'"><div class="pstvideoImg1"  style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%),url('+a+');background-repeat: no-repeat;background-size: contain;"> <label class="time">15:03</label>'+
                             '<a  class="play player" style="cursor:pointer" onclick="getVid(event)">'+
                                '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Group 2834.svg" alt="Play"> </a>'+
                            '<a href="#" onclick="FavEvents(this.id,pillar['+i+'],EventTitle['+i+'],EventDesc['+i+']);AddClass(this);" id="'+EventId+'" class="heartImg" style="background: #606060; padding: 5px; border-radius: 50%;"> <img id="heartImg" src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon feather-heart.svg" style="width:1.5rem;height:1.5rem;" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="https://infornt.sharepoint.com/SiteAssets/ENGEmployee/IMAGES/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"> <h5 id="popuprateh5">'+AverageRating+'</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="'+i+'" lblId ="popuprateh5" class="reviewPopup" href="#" onclick="getDetails(event,this.id);getEPlistData(event);" lblId = "popuprateh5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc" style="padding:0px !important;">'+EventDescription+'</span><label id="customimg" style="opacity:0;" >'+a+'</label></p> </div> <input type="hidden" value="'+VideoURLs+'"> </div> </div>');
  							$(".player").attr('data-toggle',"modal");
                            $(".player").attr('data-target',"#exampleModal");


                 }
                 else{
                 
                 }
                
            }
            //console.log(dataresults);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}
function getVid(event){
console.log("sankedfaf")
	var vidtest = event.target.parentElement.parentElement.lastElementChild.value;
	console.log("vidtest",vidtest);
	var evetit = event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.innerText;
	console.log(evetit ,"asdasda");
	//var evedesc = event.target.lastChild.previousElementSibling.lastElementChild.firstElementChild.innerText;
	var evedesc = event.target.parentElement.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerText;
	console.log("evedesc",evedesc );
	//$(".modalapp").append('<video controls width="400" id="myid"><source id="VideoURL" src="'+vidtest+'" type="video/mp4">');             
	 // $("video:last").css("display", "block");
	
	$(".modalapp iframe").attr('src',vidtest);
	$(".modalfoot h4").html(evetit);
	$(".modalfoot h6").html(evedesc);
	
	}

/* sb */
function getDetails(event,eventID){
//	alert("test done");
	//var testdata = $(this).html();
	
	//alert(desc);
	//log(testdata)
	//getEPlistData()
	//testdata = event.target.parentNode.parentNode.previousElementSibling.innerText;   
    //alert(testdata);
    alert(eventID);
	
        
        
}



						  
						  
						  

function getEPlistData(event){
          testdata = event.target.parentNode.parentNode.previousElementSibling.innerText; 
     //log(reviewBox)
     alert(testdata)        

        // log(testdata)

    $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items",

       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,RatingCount,EventDate,ReviewPost,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var results = data.d.results;
        log(results);
        for(var i =0;i<results.length;i++){
           if(results[i].Title === testdata){
              getRating = results[i].AverageRating;
              getRatingCount = results[i].RatingCount;
              reviewID = results[i].ID;
              log(reviewID)
              //var user = results[i].DisplayName;
              //log(user);
              log(results[i].ID);
              log(results[i]);
           }
           log(testdata);
           
        }
          log(data);
         
          //updateListItem();
          //createListItem();
          showReviewList()
        },
        error: function (xhr, status, error) {
            log("Failed");
        }

        });
             
       /* $('#ratereviewModal').on('show.bs.modal', function () {
        log('modal show');
        
        //$('.commentBox').append('<div>Sandesh</div>');
       /* $.ajax
    ({   
       
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items?$select=ID,Title,Review,AverageRating,EmpName,EmpEmailID&$orderby=Created desc",

       //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,RatingCount,EventDate,ReviewPost,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var results = data.d.results;
        log(results);
        
         for(var i=0; i<results.length; i++){
         
         //var commBox = document.querySelector('.commentBox');
         //log(commBox);
         var rev = results[i].Review;
         log(rev);
         log(results[i].Title);
         log(reviewID);

         if(Number(results[i].Title) === reviewID){
          //$(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].EmpName+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (5).svg" alt="Star"></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>1 day ago</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');
 log(results[i].Title);
         }
         //commBox.appendChild(reviewBox)
           //  log(reviewBox);
         }
      }
    }); 
    log(reviewID);
        $(this).off('show.bs.modal');
    });*/

}





/*function updateListItem() {
var siteUrl = _spPageContextInfo.webAbsoluteUrl;

    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EPRating');

    this.oListItem = oList.getItemById(reviewID);
    
   
    oListItem.set_item('Rating',starRating);
    

    
    oListItem.set_item('Review',getReviewText);

    oListItem.update();

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    
    //log(test );
    
    
    //addReviewToList();
    
}

function onQuerySucceeded() {

    alert('Item updated!');
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
} */






/*function addReviewToList(){
  // log(getRating);
   //var getCommentBox = document.querySelector('.commentBox');
   //var div = document.createElement('div');
   //div.id = 'createdDiv';
   //getCommentBox.appendChild(div)
   $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>Shawn Givens</label></div><div class="ppstar"><ul class="ppsmallStar"><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (1).svg" alt="Star"></li><li><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Icon ionic-ios-star (5).svg" alt="Star"></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>1 day ago</label></div></div><div class="reviewpara"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</p></div></div>');
}*/

	

function createListItem() {
    userName = document.getElementById('username').innerText;
    userEmail = document.getElementById('usermail').innerText; 
    
    log(userName )
    log(userEmail )
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EpRating');
        
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
        
    oListItem.set_item('Review', getReviewText);
    oListItem.set_item('AverageRating', starRating);
    oListItem.set_item('Title', reviewID);
    oListItem.set_item('EmpName',userName);
    oListItem.set_item('EmpEmailID',userEmail);

        
    oListItem.update();

    clientContext.load(oListItem);
        
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {

    //showReviewList()
    alert('Item created: ' + oListItem.get_id());
    showReviewListSubmit();
    
    
}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}


function showReviewList(){
 //var reviewBox = document.querySelector('.review1Box');
    // alert(this.id);
     
    $.ajax
    ({   
       
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items?$select=ID,Title,Review,AverageRating,EmpName,Created,EmpEmailID&$orderby=Created desc",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items",
       //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,RatingCount,EventDate,ReviewPost,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var results = data.d.results;
        log(results);
        
        for(var i=0; i<results.length; i++){    
                 
           // $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].EmpName+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-regular fa-star" id="star-1"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>'+ results[i].Created +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');     
         
         if(Number(results[i].Title) === reviewID){
         var ratingCount = results[i].AverageRating;
         log(ratingCount)
          $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].EmpName+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-regular fa-star" id="star-1"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>'+ results[i].Created +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

          if(ratingCount == 1){          
            //$("#star-1").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1").addClass("fa-solid").css({'font-size':'18px','color':'orange'});           

         }else if(ratingCount == 2){
           //$("#star-1, #star-2").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 3){
          // $("#star-1, #star-2, #star-3").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 4){
           //$("#star-1, #star-2, #star-3, #star-4").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3, #star-4").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 5){
           //$("#star-1, #star-2, #star-3, #star-4, #star-5").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3, #star-4, #star-5").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }




         }
         
         //commBox.appendChild(reviewBox)
           //  log(reviewBox);
         }
      }
    });  
}


function showReviewListSubmit(){
$.ajax
    ({   
       
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items?$select=ID,Title,Review,AverageRating,EmpName,Created,EmpEmailID&$orderby=Created desc",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EpRating')/items",
       //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,AverageRating,RatingCount,EventDate,ReviewPost,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var results = data.d.results;
        log(results);
        
        for(var i=0; i<results.length; i++){    
                 
          $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].EmpName+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-regular fa-star" id="star-1"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>'+ results[i].Created +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');     
         
         /*
         if(Number(results[i].Title) === reviewID){
         var ratingCount = results[i].AverageRating;
         log(ratingCount)
          $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="https://infornt.sharepoint.com/sites/RNTENG/SiteAssets/EngEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].EmpName+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-regular fa-star" id="star-1"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>04</label></li></ul></div></div></div><div class="reviewday"><label>'+ results[i].Created +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

          if(ratingCount == 1){          
            //$("#star-1").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1").addClass("fa-solid").css({'font-size':'18px','color':'orange'});           

         }else if(ratingCount == 2){
           //$("#star-1, #star-2").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 3){
          // $("#star-1, #star-2, #star-3").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 4){
           //$("#star-1, #star-2, #star-3, #star-4").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3, #star-4").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }else if(ratingCount == 5){
           //$("#star-1, #star-2, #star-3, #star-4, #star-5").removeClass("fa-regular").css({'font-size':'18px','color':'orange'});
             $("#star-1, #star-2, #star-3, #star-4, #star-5").addClass("fa-solid").css({'font-size':'18px','color':'orange'});
         }




         }
         */
         
         //commBox.appendChild(reviewBox)
           //  log(reviewBox);
         }
      }
    });
}

/* sb  E*/



function AddClass(elem) {
    var a = document.getElementsByClassName('heartImg')
    
    elem.classList.toggle('ChangeActiveBG');
}

function FavEvents(clicked_id,pillar,title,desc){
		
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		//var EventID = $("#eID").val();
  			//alert(clicked_id);	

  	var item={
  	 	"__metadata":{'type': 'SP.Data.EPFavouriteEventListItem'},
  	 	"Title": "EPFavouriteEvent",
   		"EventId":clicked_id,
		"EmpID":EmpId,
		"EmpName":username,
		"Pillar":pillar.outerText,
		"EventTitle":title.outerText,
		"EventDescription":desc.outerText
		//"Rating":rate.outerText,
		//"Attachments":img,
  	};
  	console.log(item);
  	  	$.ajax({
		url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items",
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
		alert("Update error"+data.responseText);
	}
  };
  
  