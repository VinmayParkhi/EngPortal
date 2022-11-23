var log = console.log;
var Timer;
$(document).ready(function(){
$('#searchTxt').on('keyup', function () {
     var allDiv = document.querySelectorAll('#ttr');
     
     for(var x=0;x<allDiv.length;x++){
          allDiv[x].remove();
     };

 	   clearTimeout(Timer);
       Timer = setTimeout(SendInput, 1000);
  }); 
function SendInput(){
      var txt = $('#searchTxt').val();
   	  log(txt.length);
    
      searchedData(txt);
}
});
function  searchedData(txt){
if(txt.length > 0){
$("#searchedData").css({'display':'block'});
$.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,AttachmentFiles,Pillar,Title,EventDate,EventKeywords,Title&$expand=AttachmentFiles",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items?$select=ID,Attachments,Pillar,EventTitle,EventDescription,AverageRating,EventDate,EventStartTime,VideoURL&$expand=AttachmentFiles&$orderby=Created desc",
        method: "GET",
        headers:
           {
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (data) {
           var res = data.d.results;
           var filtrDt = [];
             for(var i=0;i<res.length;i++){
            log(typeof res[i].Pillar)
                if((String(res[i].Pillar)).includes(txt) || (String(res[i].Title)).includes(txt) || (String(res[i].EventKeywords)).includes(txt)){
                   log(res[i].EventKeywords)
                   filtrDt.push(res[i])
                }
           }
           
             for(var x=0;x<filtrDt.length;x++){
                 var pillar = filtrDt[x].Pillar;
                 var evntTitle = filtrDt[x].Title;
                 var img = filtrDt[x].AttachmentFiles.results[0].ServerRelativeUrl;
                 //var evntDesc = filtrDt[x].EventDescription; 
                 var eventKeyword = filtrDt[x].EventKeywords; 
                 var evntDt = filtrDt[x].EventDate;  
                 var evntId = filtrDt[x].ID;
                 var evntDtNew = moment.utc(evntDt).format('DD MMM, YYYY')            
                 var imgURL = 'https://amdocs.sharepoint.com'+img+'';
                 //$("#ttr").remove();
                 log(imgURL)
                 var divSearch = document.getElementById('searchedData');
                 divSearch.style.height = '330px';
                 divSearch.style.padding = '15px 10px';
                 
                 $("#searchedData").append('<a href="https://amdocs.sharepoint.com/sites/EP/SitePages/EPEmployee/EventDetails.aspx?EventID='+evntId+'" style="margin-bottom:10px;" <div id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:10px;color:#fff;margin-bottom:10px;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:20px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;margin-bottom:0;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');
                     
         }
        }
      });
      }else{
      $("#searchedData").css({'display':'none'});
      };   
};
