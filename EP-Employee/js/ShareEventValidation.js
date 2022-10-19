var uniquID;
$(document).ready(function() { 
	//alert('Page');
	var url=window.location.href;
    uniquID= (url.split('=')[1]);
    uniquID= (uniquID.split('&')[0]);
    
    $("input[title='EventLink']").val('https://amdocs.sharepoint.com/sites/EP/SitePages/EPEmployee/EventDetails.aspx?EventID='+uniquID);
    $("input[title='EventLink']").hide();
    $('#Recipient').hide();
    $('#EventLink').hide();
    $('#s4-ribbonrow').hide();
    
    
    $(".ms-dlgTitle").css("background-color", "yellow");
        
    $("input[value$='Save']").attr('value', "Share");
    
 });
function PreSaveAction(){  
	var peopleFieldTitle ="Recipient";
	if(isPeoplePickerEmpty(peopleFieldTitle)){
		return false;
	}
	else{
	    //alert('Event Shared Successfully');
	    return true;
    }
}

function isPeoplePickerEmpty(fieldTitle){
	var isEmpty=false;
	var _PeoplePicker = $("div[title='" + fieldTitle + "']");
	var _PeoplePickerTopId = _PeoplePicker.attr('id');
	var _PeoplePickerObj = SPClientPeoplePicker.SPClientPeoplePickerDict[_PeoplePickerTopId];
	if(_PeoplePickerObj.IsEmpty()){
		_PeoplePickerObj.ShowErrorMessage("Please enter Employee name");
		isEmpty=true;
	}
	return isEmpty;
}