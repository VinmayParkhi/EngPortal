 var CurrentDate;
 var EventID;
 var testdata
 var log = console.log;
 var reviewID;
 var EventStartTimes;
 var EventEndTime;
 var EventPillar;
 var EventTitle;
 var EventDate;
 var starRating = 0;
var EventDescription;
var getReviewText;
var getRating;
var getRatingCount;
var averageRating = 0;
    var userId = _spPageContextInfo.userId;
var imageURL;
  $(document).ready(function() {
     
  $('#PastBack').click(function() {
   	      history.go(-1);        
	});
	
  GetPastEvents();
  
  /* sb */
  

       $.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,EmpName,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            log(results);
            log(results.length > 0)
            if(results.length > 0){
              
              let a = document.querySelectorAll('.pstvideoImg1');
              for(var j=0;j<results.length;j++){
              
              var id = Number(results[j].EventID);
              
              log(typeof id);
              for(var i=0;i<a.length;i++){
              
              log(a[i].querySelector('.pstvideoImg1 > a + a').getAttribute('hreflang'))
                  var b = a[i].querySelector('.pstvideoImg1 > a + a').getAttribute('hreflang');
                  var bNum = Number(b);
                  log(id);
                  log((bNum === id))
                  if(bNum === id){
                     log(a[i])
                     var c = a[i].querySelector('.pstvideoImg1 > a + a > img');
                     c.setAttribute("src", "../../SiteAssets/ENGEmployee/images/Group 3212.svg")
                  }
              }
              }
              
               }; /* if end */
            }
       });

        
        $(".submitBtn").on('click',function () {        
         getReviewText = document.querySelector('div.reviewBox > div.reviewTextarea > textarea').value;
         
         if(starRating === 0 && (getReviewText === '' || null)){
         }else{
         createListItem();
         
         }
        
        });
        
        
        
        $(".reviewPopup").on('click',function (event) { 
            
                                           
                var rateA = $("#" + $(this).attr("lblId")).text().split(' ');
                $("#rateno-label").text(rateA[0]);
                $("#baseon-label").text('Based on ' + rateA[1].match(/\d+/) + ' review');
                ratings.ratestar = rateA[0];
                
                
                var textArea = document.querySelector('div.reviewBox > div.reviewTextarea > textarea');
                textArea.value= '';
         
                log(getReviewText)
                
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
     /* sb End */ 
     
  
    $("#all").on("click", function(){   
    $("div.pastevntsCard").removeClass("d-none");
    });
    $("#work").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Work").removeClass("d-none");
    });
    $("#life").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Life").removeClass("d-none");
    });
    $("#wellbeing").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Enrich").removeClass("d-none");
    });
    $("#wowpride").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Wow").removeClass("d-none");
    });
	$("#connectcommunity").on("click", function(){
    $("div.pastevntsCard").addClass("d-none");    
    $("div.pastevntsCard.Connect").removeClass("d-none");
    });

});

sessionStorage.clear();
function GetPastEvents() {
	var today= moment().format('YYYY-MM-DDTHH:mm:SS'); 
    // Specify the Id of the Item that you want to fetch
    var Itemid = 1;
    $.ajax
    ({
        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,EventLink,Attachments,Pillar,Title,EventDescription,EventDate,EventStartTime,EventEndTime,VideoURL&$expand=AttachmentFiles&$&$filter=(EventStatus eq 'Completed') and (EventEndTime le '"+today+"')&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i < dataresults.length; i++) {
                var EventDates = moment(data.d.results[i].EventEndTime).format('YYYY-MM-DD hh:mm a');              	 
                var EventId = data.d.results[i].ID;
                var pillar= data.d.results[i].Pillar;
                var EventTitle= data.d.results[i].Title;
                var EventDescription= data.d.results[i].EventDescription;   	 
               	var VideoURLs = data.d.results[i].VideoURL;
                var d = new Date();			    
                CurrentDate = moment(d).format('YYYY-MM-DD hh:mm a');
			    imageURL = data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl;
                  var a =  "https://amdocs.sharepoint.com/" + data.d.results[i].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl;
				if (VideoURLs == null){																
                 $(".pastEvntsWr").append('<div class="pastevntsCard '+pillar+'"><div class="pstvideoImg1"  style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%),url('+a+');background-repeat: no-repeat;background-size: cover;"> <label class="time"></label>'+
                            
                            '<a href="#" onclick="FavEvents(this.id,this.className,this.title,this.name,this.hreflang,event);" hreflang="'+EventId+'"  title="'+EventDescription+'" id="'+EventTitle+'" class="'+pillar+'" name="'+imageURL+'" style="background: #606060;border-radius: 50%;position: absolute;top: -5%;right: 5%;"> <img id="heartImg" src="../../SiteAssets/ENGEmployee/images/Group 3218.svg" style="width:2.5rem;height:2.5rem;" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="../../SiteAssets/ENGEmployee/images/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"><h5 id="popuprateh5">0(0)</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="'+i+'" lblId ="popuprateh5" class="reviewPopup" href="#" onclick="getEPlistData(this.parentElement,event);" lblId = "popuprateh5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc" style="padding:0px !important;">'+EventDescription+'</span><label id="customimg" style="opacity:0; display:none;" >'+a+'</label></p> </div> <input type="hidden" value="'+VideoURLs+'"> </div> </div> <input type="hidden" id="EventStartDate" value="'+EventDates+'">');
  							$(".player").attr('data-toggle',"modal");
                            $(".player").attr('data-target',"#exampleModal");
				
				}else{
					$(".pastEvntsWr").append('<div class="pastevntsCard '+pillar+'"><div class="pstvideoImg1"  style="background:linear-gradient(180deg, #00000000 0%, #0D0D0DE8 74%, #121112 100%),url('+a+');background-repeat: no-repeat;background-size: cover;"> <label class="time">15:03</label>'+
                             '<a  class="play player" style="cursor:pointer" onclick="getVid(event)">'+
                                '<img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Play"> </a>'+
                            '<a href="#" onclick="FavEvents(this.id,this.className,this.title,this.name,this.hreflang,event);" hreflang="'+EventId+'"  title="'+EventDescription+'" id="'+EventTitle+'" class="'+pillar+'" name="'+imageURL+'" style="background: #606060;border-radius: 50%;position: absolute;top: -5%;right: 5%;"> <img id="heartImg" src="../../SiteAssets/ENGEmployee/images/Group 3218.svg" style="width:2.5rem;height:2.5rem;" alt="Heart"></a>'+  
                            '<div class="pastevntsDetails"> <div class="radios_Rating"> <div class="radios"><small><label id="pillar" class="'+pillar+'">'+pillar+'</label></small> </div><div class="rating">'+
                            '<img src="../../SiteAssets/ENGEmployee/images/Icon ionic-ios-star.svg" alt="Star"> <label id="popuprate"><h5 id="popuprateh5">0(0)</h5></label>'+
                            '</div> </div> <div class="title_review"> <div class="evntTitle"> <h4> <label id="EventTitle">'+EventTitle+'</label> </h4> </div><div class="review"> <h6>'+
                            '<a id="'+i+'" lblId ="popuprateh5" class="reviewPopup" href="#" onclick="getEPlistData(this.parentElement,event);" lblId = "popuprateh5" data-bs-toggle="modal" data-bs-target="#ratereviewModal">Write Review</a></h6>'+
                            '</div> </div> <p class="row"><span id="EventDesc" style="padding:0px !important;">'+EventDescription+'</span><label id="customimg" style="opacity:0; display:none;" >'+a+'</label></p> </div> <input type="hidden" value="'+VideoURLs+'"> </div> </div>');
  							$(".player").attr('data-toggle',"modal");
                            $(".player").attr('data-target',"#exampleModal");

				}                
            }
           
           
           $.ajax({
        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,Title,EventDescription,EventDate,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
          var allResults = data.d.results;
          
          log(allResults)
             for(var k=0;k<allResults.length;k++){
             log(allResults[k].Pillar)
             log(allResults[k].Title)
             
             let allResId = [];
             
             
             var allPastEveCards = document.querySelectorAll('.pastevntsCard');
           
           for(var x=0;x<allPastEveCards.length;x++){
           
           var pill = allPastEveCards[x].querySelector('#pillar').innerText;
           var title = allPastEveCards[x].querySelector('#EventTitle').innerText;
           
                if(allResults[k].Pillar === pill && allResults[k].Title === title){
                   log(allResults[k].Pillar === pill && allResults[k].Title === title);
                   let pastCards = [];
                   pastCards.push(allPastEveCards[x])
                   allResId.push(allResults[k].ID);
                   setAverageRating(pastCards,allResId)

                   
                }
             }
        }
          }
        });
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
}



function setAverageRating(cards,IDs){

log(cards);
log(IDs);

   $.ajax({
        
        
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,EventID,Review,RatingAverage,Title,Created,EmpEmailID&$orderby=Created desc",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
           var res = data.d.results;
           log(res)
           var rt1=0;
		        var rt2=0;
		        var rt3=0;
		        var rt4=0;
		        var rt5=0;
		        var num =0;
           for(var c=0;c<res.length;c++){
              if(Number(res[c].EventID) === IDs[0]){
              
                 num = num + 1;
                 
                 log(res[c].RatingAverage) 
                              
		        
                 if(res[c].RatingAverage === 1){
                   rt1 = rt1 + 1;
                 }else if(res[c].RatingAverage === 2){
                   rt2 = rt2 + 1;
                 }else if(res[c].RatingAverage === 3){
                   rt3 = rt3 + 1;
                 }else if(res[c].RatingAverage === 4){
                   rt4 = rt4 + 1;
                 }else if(res[c].RatingAverage === 5){  
                   rt5 = rt5 + 1;
                 }

                var rtTotal = rt5 + rt4 + rt3 + rt2 + rt1;
         var avrTotalRt = (5 * rt5 + 4 * rt4 + 3 * rt3 + 2 * rt2 + 1 * rt1) / rtTotal;
         log(avrTotalRt);
         
         var averageRtRound = Math.round(avrTotalRt * 10) / 10;
         
         log(cards[0].querySelector("#popuprateh5"))
          cards[0].querySelector("#popuprateh5").innerText = averageRtRound + '('+num+')';
          

                

              }
           }
        }
        });
}


function getVid(event){
	var vidtest =  event.target.parentElement.parentElement.lastElementChild.value;
	var evetit = event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.innerText;
	var evedesc = event.target.parentElement.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerText;
	
	$(".modalapp iframe").attr('src',vidtest);
	$(".modalfoot h4").html(evetit);
	$(".modalfoot h6").html(evedesc);
	
	}

/* sb */
			  
						  
						  

function getEPlistData(id,event){

      var avgRatingLabel3 = document.getElementById('rateno-label');         
        
        var totalRatings13 = document.getElementById('baseon-label');
        
        var avgRatingLabel0 = avgRatingLabel3.innerText;
        var totalRatings0 = totalRatings13.innerText;
        
        log(avgRatingLabel0)
        
           var avgRatingLabel4 = document.getElementById('rateno-label');
           avgRatingLabel4.innerText = 0;
           var totalRatings14 = document.getElementById('baseon-label');
           totalRatings14.innerText = 'Based on 0 reviews';

        
     
     $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-regular").css({'font-size':'14px','color':'orange'});  

     
     testdata = event.target.parentNode.parentNode.previousElementSibling.innerText; 
     testdata2 = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('#pillar').innerText; 
     log(testdata)  
     log(testdata2)      
log(id)
       
    $.ajax
    ({
       url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=*&$expand=AttachmentFiles&$orderby=Created desc",
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
        log(results[i].Title== testdata)
        log(results[i].Title == testdata && results[i].Pillar == testdata2)
           if(results[i].Title.includes(testdata) && results[i].Pillar.includes(testdata2)){
              
              reviewID = results[i].ID;
              EventDate = results[i].EventDate;
              EventStartTimes = results[i].EventStartTime;
              EventEndTime= results[i].EventEndTime
 			  EventPillar = results[i].Pillar;
 			  EventTitle = results[i].Title;

              log(reviewID)
              log(results[i].ID);
              log(results[i]);
           }
           
        }
         
          showReviewList()
        },
        error: function (xhr, status, error) {
        }

        });
             
      }



function createListItem() {
var userId = _spPageContextInfo.userId;
    var userName = document.getElementById('username').innerText;
    var userEmail = document.getElementById('userEmail').innerText; 
    var userId = _spPageContextInfo.userId;
    var Dept = $("#dept").html();
    var Loc = $("#loc").html(); 
    
    log(userName )
    log(userEmail )
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EPRating');
        
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
        
    oListItem.set_item('Review', getReviewText);
    oListItem.set_item('RatingAverage', starRating);
    oListItem.set_item('EventID', reviewID);
    oListItem.set_item('Title',EventTitle);
    oListItem.set_item('EmpEmailID',userEmail);
    oListItem.set_item('EmpID',userId);
    oListItem.set_item('Location',Loc);
    oListItem.set_item('Department',Dept);
	oListItem.set_item('Pillar',EventPillar);
    oListItem.set_item('EventTitle',EventTitle);
    oListItem.set_item('EventDate',EventDate);
	oListItem.set_item('EventStartTime',EventStartTimes);
    oListItem.set_item('EventEndTime',EventEndTime);
    
    oListItem.update();

    clientContext.load(oListItem);
        
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {
    
    showReviewList();
    
    
}

function onQueryFailed(sender, args) {

}


function showReviewList(){
 
     $(".review1Box").remove();
    $.ajax
    ({   
       
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPRating')/items?$select=ID,EventID,Review,RatingAverage,Title,Created,EmpEmailID&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
        var rate1=0;
        var rate2=0;
        var rate3=0;
        var rate4=0;
        var rate5=0;
        var results = data.d.results;
        log(results);        
        for(var i=0; i<results.length; i++){    
            var ratingCount = results[i].RatingAverage;
            log(ratingCount) 
           var ratings = results[i].RatingCount;
          var created = results[i].Created;
          
          var createdTime =  moment(created).fromNow();
          
        
         if(Number(results[i].EventID) === reviewID){
         
         
         
         log(ratingCount);
         if(ratingCount === 1){               
         $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-2"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');
             
             rate1 = rate1 + 1;

         }else if(ratingCount === 2){           
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-3"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate2 = rate2 + 1;

         }else if(ratingCount === 3){           
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-4"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate3 = rate3 + 1;
         }else if(ratingCount === 4){          
           $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-4" style="font-size:18px;color:orange;"></span></li><li><span class="fa-regular fa-star" id="star-5"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate4 = rate4 + 1;
         }else if(ratingCount === 5){           
          $(".commentBox").append( '<div class="review1Box"><div class="box1Heading"><div class="namestar"><div class="ppimg"><img src="../../SiteAssets/ENGEmployee/images/Group 2834.svg" alt="Profile Pic"></div><div class="ppname_star"><div class="ppname"><label>'+results[i].Title+'</label></div><div class="ppstar"><ul class="ppsmallStar"><li><span class="fa-solid fa-star" id="star-1" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-2" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-3" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-4" style="font-size:18px;color:orange;"></span></li><li><span class="fa-solid fa-star" id="star-5" style="font-size:18px;color:orange;"></span></li><li><label>'+ratingCount+'</label></li></ul></div></div></div><div class="reviewday"><label>'+ createdTime +'</label></div></div><div class="reviewpara"><p>'+ results[i].Review +'</p></div></div>');

             rate5 = rate5 + 1;          
           
         }
         
         
         var ratingTotal = rate5 + rate4 + rate3 + rate2 + rate1;
         var avrTotalRating = (5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + 1 * rate1) / ratingTotal;
         log(avrTotalRating);
         
         var avgRatingLabel = document.getElementById('rateno-label');
         var totalRatings = document.getElementById('baseon-label');
         log(avgRatingLabel);
         avgRatingLabel.innerText = Math.round(avrTotalRating * 10) / 10;
         
         totalRatings.innerText = 'Based on '+ratingTotal+' reviews';
         
         averageRating = Math.round(avrTotalRating * 10) / 10;
         
         var avgRatingLabel2 = document.getElementById('rateno-label');
        var avgRatingLabel2Text = Number(avgRatingLabel2.innerText);
         } 
       }
       
       
       if(avgRatingLabel2Text >= 1 && avgRatingLabel2Text <= 1.4){
       $('#starAv1').removeClass("fa-regular");      
       $('#starAv1').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});       
            
    }else if(avgRatingLabel2Text >= 1.5 && avgRatingLabel2Text <= 1.9){
       $('#starAv1').removeClass("fa-regular");
       $('#starAv1').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv2').css({'display':'none'});
       $('#starAvHalf1').css({'display':'block'}).css({'font-size':'14px','color':'orange'});
       $('#starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});
             
    }else if(avgRatingLabel2Text >= 2 && avgRatingLabel2Text <= 2.4){ 
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAv3, #starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv3, #starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});
            
    }else if(avgRatingLabel2Text >= 2.5 && avgRatingLabel2Text <= 2.9){
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf2').css({'display':'block'}).css({'font-size':'14px','color':'orange'});       
       $('#starAv3').css({'display':'none'});
       $('#starAv1, #starAv2').removeClass("fa-regular");
       $('#starAv1, #starAv2').addClass("fa-solid").css({'font-size':'14px','color':'orange'});       
       $('#starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv4, #starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf3,#starAvHalf4').css({'display':'none'});
       
    }else if(avgRatingLabel2Text >= 3 && avgRatingLabel2Text <= 3.4){      
       $('#starAv1, #starAv2, #starAv3').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3').addClass("fa-solid").css({'font-size':'14px','color':'orange'});       
       $('#starAv4, #starAv5').removeClass("fa-solid");
       $('#starAv4, #starAv5').addClass("fa-regular");       
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});

    }else if(avgRatingLabel2Text >= 3.5 && avgRatingLabel2Text <= 3.9){
       $('#starAv1,#starAv2,#starAv3').removeClass("fa-regular");
       $('#starAv1,#starAv2,#starAv3').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf3').css({'display':'block'}).css({'font-size':'14px','color':'orange'});
       $('#starAv4').css({'display':'none'});       
       $('#starAv5').removeClass("fa-solid");
       $('#starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf4').css({'display':'none'})
       
    }else if(avgRatingLabel2Text >= 4 && avgRatingLabel2Text <= 4.4){      
       $('#starAv1, #starAv2, #starAv3, #starAv4').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4').addClass("fa-solid").css({'font-size':'14px','color':'orange'}); 
       $('#starAv5').removeClass("fa-solid");
       $('#starAv5').addClass("fa-regular");
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});  
         
    }else if(avgRatingLabel2Text >= 4.5 && avgRatingLabel2Text <= 4.9){
     $('#starAv1, #starAv2, #starAv3, #starAv4').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4').addClass("fa-solid").css({'font-size':'14px','color':'orange'});    
       $('#starAvHalf4').css({'display':'block','font-size':'14px','color':'orange'});
       $('#starAv5').css({'display':'none'});
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3').css({'display':'none'});
       
    }else if(avgRatingLabel2Text == 5){    
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').removeClass("fa-regular");
       $('#starAv1, #starAv2, #starAv3, #starAv4, #starAv5').addClass("fa-solid").css({'font-size':'14px','color':'orange'});
       $('#starAvHalf1,#starAvHalf2,#starAvHalf3,#starAvHalf4').css({'display':'none'});  
          }
          
          
      }
    });  
    
    $("#star1, #star2, #star3, #star4, #star5").removeClass("fa-solid").css({'font-size':'18px','color':'orange'});
    $("#star1, #star2, #star3, #star4, #star5").addClass("fa-regular").css({'font-size':'18px','color':'orange'});

    

    
    getReviewText = document.querySelector('div.reviewBox > div.reviewTextarea > textarea');

    getReviewText.value = '';
    }





function AddClass(elem) {
    var a = document.getElementsByClassName('heartImg')
    
    elem.classList.toggle('ChangeActiveBG');
}
 
  
  function FavEvents(EventTitle,pillar,EventDesc,imageURL,id,event){
  		var username = $("#username").text();
 		var EmpId = $("#EMpID").text();
 		var numID = Number(id);
 		//log(event.target.parentElement.parentElement.parentElement.parentElement)
 		
 		//var ex = event.target;
 		log(username)
 		var userId = _spPageContextInfo.userId;

         log(userId)
 		$.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,Title,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            log(results);
            var idArray = [];
            var idMatchedArray = [];
            var itemID;
            var empName;
            var empId;
            for(var i=0;i<results.length;i++){
              
              var eventId = Number(results[i].EventID);
              
            if(numID === eventId){
            
                 idArray.push(results[i].EventID);
                 idMatchedArray.push(results[i]);
                 itemID = results[i].ID;
                 empName = results[i].Title;
                 empId = results[i].EmpID;
                 console.log(results[i]);
                 console.log(empName);
            }
                
           } /* for end */
           
           console.log(idArray);
           console.log(idMatchedArray);
             
             if(idArray.length === 0 ){
                 var item={
  	 	"__metadata":{'type': 'SP.Data.EPFavouriteEventListItem'},
  	 	"Title": "EPFavouriteEvent",
   		"EventID":id,
		"EmpID":EmpId,
		"Title":EventTitle,
		"Pillar":pillar,
		//"EventTitle":EventTitle,
		"EventDescription":EventDesc,
		"ImageURL" : imageURL
		  	};
  	console.log(item);

  	 			 	$.ajax({
					url:_spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items",
					type: "POST",
					contentType: "application/json; odata=verbose",
					data:JSON.stringify(item),
					headers: {
						"Accept": "application/json; odata=verbose",
						"X-RequestDigest":$("#__REQUESTDIGEST").val()		
					},
					success:OnSuccess,
					error:OnError
				    });
             }else if(Number(idArray[0]) === numID && username === empName){
               log(idArray[0] === numID && username === Title)
               RemoveListItem(itemID,event )            
               }/* if end */
           }
        });
          	  	
	function OnSuccess(data){
	   
	   
	   var userId = _spPageContextInfo.userId;
 $.ajax({
 		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPFavouriteEvent')/items?$select=ID,Title,EmpID,EventID,Pillar&$filter=AuthorId eq "+userId+"",

        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data, status, xhr) {
            var results = data.d.results;
            log(results);
            log(results.length > 0)
            if(results.length > 0){

	   let a = document.querySelectorAll('.pstvideoImg1');
                for(var j=0;j<results.length;j++){
              
              var id = Number(results[j].EventID);
            
               for(var i=0;i<a.length;i++){
               
               log(a[i]);
                  var b = a[i].querySelector('.pstvideoImg1 > a').getAttribute('hreflang');
                  log(b);
                  var bNum = Number(b);
                  log(id);
                  if(bNum === id){
                    log(a[i])
                     log(a[i].querySelector('.pstvideoImg1 > a > img'));
                     var c = a[i].querySelector('.pstvideoImg1 > a > img');
                     c.setAttribute("src", "../../SiteAssets/ENGEmployee/images/Group 3212.svg")
                  } 
              }
             }
		} /* if end */
	}
	});
}
    function OnError(data){
	}
  }; 
  
  
 function RemoveListItem(delID,event) {  
            
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EPFavouriteEvent')/items(" + delID  + ")",  
            type: "POST",  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) { 
            
            let abc = event.target;
            abc.setAttribute("src", "../../SiteAssets/ENGEmployee/images/Group 3218.svg")
                             
            },  
            error: function(data) {  
            }  
        });  
     
} 
