 var oLoader; 
 var attcount = 0; 
 var arraycount = 0; 
 $(document).ready(function() { 
 //$('#imgInp').multifile();//For facilitate multi file upload 
  
 $("#NewSaveItem1").click(function() {formSave()}); 
  
 }); 
  
  
 function formSave() { 
 //oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose("Working on it", "Creating New Item..."); 
  
  
 var data = []; 
 //arraycount += fileArray.length;
 data.push({ 
 "Thought": $("input[title='thought']").val(), 
 }); 
 createNewItemWithAttachments("Thought_List", data).then( 
 function
 () { 
 //if (oLoader.close) setTimeout(function () { oLoader.close(); }, 3000); 
 window.location.replace(_spPageContextInfo.siteAbsoluteUrl + "/SitePages/ENG_Admin/UploadBanner.aspx"); 
  
 }, 
 function(sender, args) { 
 console.log('Error occured' + args.get_message()); 
 } 
 ) 
  
  
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
// listItem.set_item("Description", listValues[0].Description); 
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
  