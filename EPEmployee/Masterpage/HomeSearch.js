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
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPEvent')/items",
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
                };
           }
             //var pillar = res[t].Pillar;
             //var evntTitle = res[t].Title;
             //var evntDesc = res[t].EventDescription;

             log(filtrDt)
           
             for(var x=0;x<filtrDt.length;x++){
                 var pillar = filtrDt[x].Pillar;
                 var evntTitle = filtrDt[x].Title;
                 var evntDesc = filtrDt[x].EventDescription; 
                 var eventKeyword = filtrDt[x].EventKeywords; 
                 var evntDt = filtrDt[x].EventDate;  
                 var evntDtNew = moment.utc(evntDt).format('DD MMM, YYYY')            
                 
                 //$("#ttr").remove();
                 
                 var divSearch = document.getElementById('searchedData');
                 divSearch.style.height = '330px';
                 $("#searchedData").append('<div style="margin:10px;" id="ttr"><div class="evntCard" style="width:100%;background:#eee;border-radius:8px;padding:10px;">'+
                 '<p id="evntDt">'+evntDtNew+'</p><p id="EventDt">'+pillar+'</p> <p id="evntTitle">'+evntTitle+'</p> <p id="evntDesc">'+evntDesc+'</p><p id="eventKeyword">'+eventKeyword+'</p></div></div>');

             }
             
             //$("#searchedData").append('<div style="display:flex;"><div class="evntCard" style="height: 30vh;width:22vw;background:#e4e4e4;border-radius:8px;padding:10px;">'+
               //         '<p id="pillar">'+pillar+'</p> <p id="evntTitle">'+evntTitle+'</p> <p id="evntDesc">'+evntDesc+'</p></div></div>');
           //}
           
         }
        //}
        
      });
      }else{
      $("#searchedData").css({'display':'none'});
      };
};