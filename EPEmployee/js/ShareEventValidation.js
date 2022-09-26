var uniquID;
$(document).ready(function() { 
	var url=window.location.href;
    uniquID= (url.split('=')[1]);
    uniquID= (uniquID.split('&')[0]);
    
    $("input[title='EventLinks']").val('https://infornt.sharepoint.com/sites/RNTENG/SitePages/Employee/EmpEventDetails.aspx?EventID='+uniquID);
    $("input[title='EventLinks']").hide();
    $('#Recipient').hide();
    $('#EventLinks').hide();
    $('#s4-ribbonrow').hide();
    
    $(".ms-dlgTitle").css("background-color", "yellow");
        
    $("input[value$='Save']").attr('value', "Share");
    
 });
