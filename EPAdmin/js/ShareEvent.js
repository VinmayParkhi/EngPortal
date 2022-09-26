var uniquID;
$(document).ready(function() { 
	var url=window.location.href;
    uniquID= (url.split('=')[1]);
    uniquID= (uniquID.split('&')[0]);
   // uniquID= (uniquID.split('&')[2]);
	//uniquID = uniquID.substring(0, uniquID.indexOf('&'));
    
    
    $("input[title='EventLinks']").val('https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/EmpEventDetails.aspx?EventID='+uniquID);
    $("input[title='EventLinks']").hide();
    $('#Recipient').hide();
    $('#EventLinks').hide();
    $('#s4-ribbonrow').hide();
    
    var Title = $('.sp-peoplepicker-topLevel').val(); 
    //console.log("Title") 		
    if (Title.length < 1) {  
	    alert(Title.length)
	    $("input[value$='Save']").attr('disabled', 'disabled')  
	}else {
		$("input[value$='Save']").removeAttr("disabled")
	}
    
    $("input[value$='Save']").attr('value', "Share");
    
 });
