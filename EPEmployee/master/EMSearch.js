var log = console.log;
$(document).ready(function(){
  

$('#searchTxt').on('keyup', function () {
     var allDiv = document.querySelectorAll('#ttr');
     
     for(var x=0;x<allDiv.length;x++){
          allDiv[x].remove();
     };
      var txt = $(this).val();
    log(txt.length);
  
       searchedData(txt);
   
  }); 
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
        log(data);
        
        //for(var t=0;t<res.length;t++){
         var filtrDt = [];
             
             
             for(var i=0;i<res.length;i++){
            log(typeof res[i].Pillar)
                if((String(res[i].Pillar)).includes(txt) || (String(res[i].Title)).includes(txt) || (String(res[i].EventKeywords)).includes(txt)){
                   log(res[i].EventKeywords)
                   filtrDt.push(res[i])
                }
           }
             //var pillar = res[t].Pillar;
             //var evntTitle = res[t].Title;
             //var evntDesc = res[t].EventDescription;

             log(filtrDt)
           
             for(var x=0;x<filtrDt.length;x++){
                 var pillar = filtrDt[x].Pillar;
                 var evntTitle = filtrDt[x].Title;
                 var img = filtrDt[x].AttachmentFiles.results[0].ServerRelativeUrl;
                 //var evntDesc = filtrDt[x].EventDescription; 
                 var eventKeyword = filtrDt[x].EventKeywords; 
                 var evntDt = filtrDt[x].EventDate;  
                 var evntId = filtrDt[x].ID;
                 var evntDtNew = moment.utc(evntDt).format('DD MMM, YYYY')            
                 var imgURL = 'https://infornt.sharepoint.com/'+img+'';
                 //$("#ttr").remove();
                 log(imgURL)
                 var divSearch = document.getElementById('searchedData');
                 divSearch.style.height = '330px';
                 divSearch.style.padding = '15px 10px';
                 
                 $("#searchedData").append('<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/EmpEventDetails.aspx?EventID='+evntId+'" <div id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:10px;color:#fff;margin-bottom:10px;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:20px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;margin-bottom:0;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');

                 
             
             /*if(pillar == 'Connect and community'){
                    var pillar2 = 'ConnectAndCommunity';
                    $("#searchedData").append('<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/'+pillar2+'.aspx" target="_blank" <div style="margin-bottom:10px" id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:15px;color:#fff;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:40px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');
                 }else if(pillar == 'Wow and Pride'){
                    var pillar3 = 'WowAndPride';
                    $("#searchedData").append('<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/'+pillar3+'.aspx" target="_blank" <div style="margin-bottom:10px" id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:15px;color:#fff;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:40px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');
                 }else{
                    $("#searchedData").append('<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/EmpEventDetails.aspx?EventID='+evntId+'" target="_blank" <div style="margin-bottom:10px" id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:15px;color:#fff;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:40px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');
                 };
             
             }*/
              /*$("#searchedData").append('<a href="https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/'+pillar2+'.aspx" <div style="margin:10px" id="ttr"><div class="evntCard" style="background:#000000a8;border-radius:10px;position:relative;width:100%;padding:15px;color:#fff;"><img src="'+imgURL+'" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:10px;z-index:-1;">'+
                 '<div class="evPillar" style="display:flex;justify-content:space-between;margin-bottom:40px;"><p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p></div><p id="evntTitle" style="font-size:13px;font-weight:500;">'+evntTitle+'</p><p id="eventKeyword" style="margin-bottom:0;">'+eventKeyword+'</p></div></div></a>');*/       
         }
      
        }
      });
      }else{
      $("#searchedData").css({'display':'none'});
      };
      
      
};