 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 var attachmentURL;
 $(document).ready(function() { 
 //$('#file_input').multifile();//For facilitate multi file upload 

 $("#publishWork").click(function() {
 	formSave();
 
 }); 
     
  });
 function formSave() { 
 //oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
  
  
 var data = []; 
 var fileArray = []; 
 $("#attachFilesHolder input:file").each(function() { 
 if ($(this)[0].files[0]) { 
 fileArray.push({ "Attachment": $(this)[0].files[0] }); 
 } 
 }); 
 arraycount += fileArray.length;
 data.push({ 
 "Title": $("input[title='Baner Title']").val(), 
 "BannerDescription": $("#PublishWorkDesc").val(),
 "Pillar": $("input[title='Pillar']").val(), 
 "Files": fileArray 
 }); 
 
 
 console.log(data);
 createNewItemWithAttachments("EPBanner", data).then( 
 function
 () { 
 //if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
 window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/Admin_Work.aspx"); 
  
 }, 
 function(sender, args) { 
 console.log('Error occured' + args.get_message()); 
 } 
 ) 
  
  
 } 
 
 
  function matchPillarAndText(lastPillar){ 
 
 $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Admin-HubList')/items?$select=Text,Image",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('EPTile')/items",
        method: "GET",
        headers:
           {
               // Accept header: Specifies the format for response data from the server.
               "Accept": "application/json;odata=verbose"
           },
           
        success: function (resp) {
        var updateItemID;
        
        for(var s = 0; s < resp.d.results.length; s++){
           //textArray.push(resp.d.results[s].Text)
           if(resp.d.results[s].Text == lastPillar){
           
             console.log(resp.d.results[s])
             updateItemID = resp.d.results[s].ID
             uploadBanner(updateItemID)
             console.log(updateItemID)
             break;
           }
        }
        
        //console.log(resp.d.results.length)
        //console.log(textArray)
        console.log(resp)
        
        }
        });
        
        //console.log(textArray)
//}
console.log(data.Pillar)

}


function getPillar(){
 
 $.ajax
    ({
        
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('List Name')/items(" + Itemid + ")/AttachmentFiles",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('EPTile')/items?$select=Pillar",
        method: "GET",
        headers: {

			 "Accept": "application/json; odata=verbose",
			
			 "content-type": "application/json; odata=verbose",
 },
           
        success: function (resp2) {
        var pillarArray = [];
        var lastIndexPillar;
        
        for(var i=0; i<resp2.d.results.length; i++){
        pillarArray.push(resp2.d.results[i].Pillar)
                
        }
        
        console.log(resp2.d.results.length);
         lastIndexPillar = pillarArray.slice(-1)[0];
        
        console.log(pillarArray)
        console.log(lastIndexPillar)
        matchPillarAndText(lastIndexPillar)
        }       
        
        });

 }



function uploadBanner(itemID){

var siteUrl = _spPageContextInfo.webAbsoluteUrl;

var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle('EPTile');

    console.log("updatedItem: ");
    console.log("updatedItem:",);
    this.oListItem = oList.getItemById(itemID);
    //console.log("updatedItem: ", updateItemID[0]);
    oListItem.set_item('Image', attachmentURL);
    //console.log("imageURL: ",attachmentURL);
    oListItem.update();

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed))
}

function onQuerySucceeded() {

    //alert('Item updated!');
}

function onQueryFailed(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

  
  
 var createNewItemWithAttachments = function(listName, listValues) { 
 var fileCountCheck = 0; 
 var fileNames; 
 var context = new SP.ClientContext.get_current(); 
 var dfd = $.Deferred(); 
 var targetList = context.get_web().get_lists().getByTitle(listName); 
 context.load(targetList); 
 var itemCreateInfo = new SP.ListItemCreationInformation(); 
 var listItem = targetList.addItem(itemCreateInfo); 
 listItem.set_item("Title", listValues[0].Title); 
 listItem.set_item("BannerDescription", listValues[0].BannerDescription);
 listItem.set_item("Pillar", listValues[0].Pillar);
 listItem.update(); 
 context.executeQueryAsync( 
 function() { 
 var id = listItem.get_id(); 
 if (listValues[0].Files.length != 0) { 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUpload(listName, id, listValues, fileCountCheck).then( 
 function() { 
 }, 
 function(sender, args) { 
 console.log("Error uploading"); 
 dfd.reject(sender, args); 
 } 
 ); 
 } 
 } 
 else { 
 dfd.resolve(fileCountCheck); 
 } 
 }, 
 function(sender, args) { 
 console.log('Error occured' + args.get_message()); 
 } 
 ); 
 return dfd.promise(); 
 } 
 
  function loopFileUpload(listName, id, listValues, fileCountCheck) { 
 var dfd = $.Deferred(); 
 uploadFileHolder(listName, id, listValues[0].Files[fileCountCheck].Attachment).then( 
 function (data) { 
 var objcontext = new SP.ClientContext(); 
 var targetList = objcontext.get_web().get_lists().getByTitle(listName); 
 var listItem = targetList.getItemById(id); 
 objcontext.load(listItem); 
 objcontext.executeQueryAsync(function () { 
 console.log("Reload List Item- Success"); 
 fileCountCheck++; 
 if (fileCountCheck <= listValues[0].Files.length - 1) { 
 loopFileUpload(listName, id, listValues, fileCountCheck); 
 } else { 
 console.log(fileCountCheck + ": Files uploaded"); 
 attcount += fileCountCheck; 
 if (arraycount == attcount) { 
// if (oLoader.close) setTimeout(function () { oLoader.close();  }, 3000); 
 	window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");
 } 
  
 } 
 }, 
 function (sender, args) { 
 	console.log("Reload List Item- Fail" + args.get_message()); 
 }); 
  
 }, 
 function(sender, args) { 
	console.log("Not uploaded"); 
 	dfd.reject(sender, args); 
 }); 
 return dfd.promise(); 
 } 
  
  //File Upload code
  
 function uploadFileHolder(listName, id, file) { 
	 //file = $(this)[0].files[0];

 	var getFileBuffer = function(file) {

		var deferred = $.Deferred();

 		var reader = new FileReader();

 		reader.onload = function(e) {
 			deferred.resolve(e.target.result);
 		}

 		reader.onerror = function(e) {
 			deferred.reject(e.target.error);
 			 		}

 reader.readAsArrayBuffer(file);

 return deferred.promise();

 };

 getFileBuffer(file).then(function(buffer) {

 $.ajax({


 url: _spPageContextInfo.webAbsoluteUrl +
 "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + file.name + "')",

 method: 'POST',

 data: buffer,

 processData: false,


 headers: {


 "Accept": "application/json; odata=verbose",

 "content-type": "application/json; odata=verbose",


 "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,


 "content-length": buffer.byteLength
 },
 success: function(response) {
 
 attachmentURL = _spPageContextInfo.siteAbsoluteUrl + response.d.ServerRelativeUrl
 console.log(response)
 console.log(attachmentURL)
 getPillar();
 
 
 //alert("Uploaded");
 //window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx");

 
 },
 error: function(error){
 //alert("error :"+error);
 }

 });

 });
 }
 

 
 function getFileBuffer(file) { 
 var deferred = $.Deferred(); 
 var reader = new FileReader(); 
 reader.onload = function(e) { 
 deferred.resolve(e.target.result); 
 } 
 reader.onerror = function(e) { 
 deferred.reject(e.target.error); 
 } 
 reader.readAsArrayBuffer(file); 
 return deferred.promise(); 
 } 
 
 