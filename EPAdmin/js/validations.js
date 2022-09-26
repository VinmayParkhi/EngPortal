$(document).ready(function(){



//alert("test done");
	$('#NewSaveItem').on("click", function (e) {  
	    e.preventDefault();  
	    var Title = $('#BanerTitle').val();  
	    var Description = $('#Description').val();  
	    var File = $("#file_input").val();
	    $(".error").remove();  
		if (Title.length < 1) {  
	      $('#BanerTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
	    }
	    if (Description.length < 1) {  
	      $('#Description').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
	    }
	    if (File.length < 1) {
		 $('.mainInformationContrainer ul').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
		}
			});  
	

	
	
	$('#publishHub').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#BannerHubTitle').val();  
		    var Description = $('#BannerHubDescription').val();  
		    var File = $("#file_input").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#BannerHubTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#BannerHubDescription').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $("#file_input").after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
			
		});
		
		
	



	
	$('#NewSaveItem1').on("click", function (e) {  
	    e.preventDefault();  
	    var Thoughts = $('#textfield').val();
	    $(".error").remove();  
		if (Thoughts.length < 1) { 
			$("#textfield").addClass("editon"); 
			$(".editstart img").attr("src","https://infornt.sharepoint.com/SiteAssets/Images/Image Icon/Image Icon/Icon feather-edit-2 (1).svg")
		    $('#textfield').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Your Good Thoughts.</span>');  
	    }
	});  
	
	
	/* starts Work Validation*/
	$('#publishWork').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishWorkTitle').val();  
		    var Description = $('#PublishWorkDesc').val();  
		    var File = $("#file_input").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishWorkTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWorkDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('#file_input').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
	}); 
	
	
	$("#PublishWorkTitle, #PublishWorkDesc, .publishWorkImage").on("input", function () {    	
	  canChangeColorWork();
	});  
	function canChangeColorWork(){  
	alert("Color change"); 	
  	var can5 = true;  
  	$("#PublishWorkTitle, #PublishWorkDesc, .publishWorkImage").each(function(){
     	if($(this).val()==''){
        	can6 = false;
     	}
  	});
   	if(can6){
    	$('#publishWork').addClass("EnableBtn");  
   	}else{
    	$('#publishWork').removeClass("EnableBtn")  
   		}
	}	

	/* ends Work Validation*/


	$('#publishLife').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishLifeTitle').val();  
		    var Description = $('#PublishLifeDesc').val();  
		    var File = $("#file_input").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishLifeTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishLifeDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('#file_input').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
	});
	
	/* starts Life Validation*/
	$("#PublishLifeTitle, #PublishLifeDesc, #file_input").on("input", function () {    	
	  canChangeColorLife();
	});  
	function canChangeColorLife(){   	
  	var can5 = true;  
  	$("#PublishLifeTitle, #PublishLifeDesc, #file_input").each(function(){
     	if($(this).val()==''){
        	can5 = false;
     	}
  	});
   	if(can5){
    	$('#publishLife').addClass("EnableBtn");  
   	}else{
    	$('#publishLife').removeClass("EnableBtn")  
   		}
	}	
	});
	/* ends Life Validation*/

	
	
	$('#PublishWellbeing').on("click", function (e) {  
		    e.preventDefault();  
		    var MainTitle = $('#PublishWellbeingTitle').val();  
		    var Description = $('#PublishWellBeingDesc').val();  
		    var File = $(".publishWellBeingImage").val();
		    $(".error").remove();  
			if (MainTitle.length < 1) {  
		      $('#PublishWellbeingTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWellBeingDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('#file_input').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
	});
	
	/* starts Wellbeing Validation*/
	$("#PublishWellbeingTitle, #PublishWellBeingDesc, #file_input").on("input", function () {    	
	  canChangeColorWellbeing();
	});  
	function canChangeColorWellbeing(){   	
  	var can5 = true;  
  	$("#PublishWellbeingTitle, #PublishWellBeingDesc, #file_input").each(function(){
     	if($(this).val()==''){
        	can5 = false;
     	}
  	});
   	if(can5){
    	$('#PublishWellbeing').addClass("EnableBtn");  
   	}else{
    	$('#PublishWellbeing').removeClass("EnableBtn")  
   		}
	}	
	});
	/* ends Wellbeing Validation*/

	
	$('#publishWowndPride').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishWowndPrideTitle').val();  
		    var Description = $('#PublishWowndPrideDesc').val();  
		    var File = $(".publishWellBeingImage").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishWowndPrideTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWowndPrideDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('#file_input').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
	});
	
	/* starts WowndPride Validation*/
	$("#PublishWowndPrideTitle, #PublishWowndPrideDesc, #file_input").on("input", function () {    	
	  canChangeColorWowndPride();
	});  
	function canChangeColorWowndPride(){   	
  	var can5 = true;  
  	$("#PublishWowndPrideTitle, #PublishWowndPrideDesc, #file_input").each(function(){
     	if($(this).val()==''){
        	can5 = false;
     	}
  	});
   	if(can5){
    	$('#publishWowndPride').addClass("EnableBtn");  
   	}else{
    	$('#publishWowndPride').removeClass("EnableBtn")  
   		}
	}	
	});
	/* ends WowndPride Validation*/

	
	
	$('#PublishConnndCom').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishConnndComTitle').val();  
		    var Description = $('#PublishConnndComDesc').val();  
		    var File = $("#file_input").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishConnndComTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishConnndComDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('#file_input').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}
	}); 
	/* starts ConnndCom Validation*/
	$("#PublishConnndComTitle, #PublishConnndComDesc, #file_input").on("input", function () {    	
	  canChangeColorWellbeing();
	});  
	function canChangeColorWellbeing(){   	
  	var can5 = true;  
  	$("#PublishConnndComTitle, #PublishConnndComDesc, #file_input").each(function(){
     	if($(this).val()==''){
        	can5 = false;
     	}
  	});
   	if(can5){
    	$('#PublishConnndCom').addClass("EnableBtn");  
   	}else{
    	$('#PublishConnndCom').removeClass("EnableBtn")  
   		}
	}	
	});
	/* ends ConnndCom Validation*/

	
	
	
		/*$('#publishHub').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#BannerHubTitle').val();  
		    var Description = $('#BannerHubDescription').val();  
		    var File = $(".sideimg").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#BannerHubTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#BannerHubDescription').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;position: absolute;top: 13.5rem;">Please Upload Banner Image</span>');
			}*/
	//});




	
		
	$("#BanerTitle, #Description, #file_input").on("input", function () {    	
	  canChangeColor();
	});
	
$(".editstart").on("click", function () {  

	  ThoughtChangeColor();
	});


function canChangeColor(){  
  	
  var can = true;  

  $("#BanerTitle, #Description, #file_input").each(function(){
     if($(this).val()==''){
        can = false;
     }
  });
  
  if(can){
    $('#NewSaveItem').addClass("EnableBtn");  
   }else{
    $('#NewSaveItem').removeClass("EnableBtn")  
   }

}

function ThoughtChangeColor(){  
  var can1 = true;  

  $("#textfield").each(function(){
     if($(this).val()==''){
        can1 = false;
     }
  });
  
  if(can1){
    $('#NewSaveItem1').addClass("EnableBtn");  
    $('#NewSaveItem1').removeAttr("disabled", true);
    
  }else{
    $('#NewSaveItem1').removeClass("EnableBtn")  
    $('#NewSaveItem1').attr("disabled", true);

    }

}
		
		
	$("#BannerHubTitle, #BannerHubDescription, #file_input").on("input", function () {    	
	  canChangeColorHub();

	});  
	function canChangeColorHub(){   	
  	var can5 = true;  
  	$("#BannerHubTitle, #BannerHubDescription, #file_input").each(function(){
     	if($(this).val()==''){
        	can5 = false;
     	}
  	});
   	if(can5){
    	$('#publishHub').addClass("EnableBtn");  
   	}else{
    	$('#publishHub').removeClass("EnableBtn")  
   		}
	}	
	});