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
		 $('.mainInformationContrainer ul').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
		}
	});  

	$('#publishHub').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#BannerHubTitle').val();  
		    var Description = $('#BannerHubDescription').val();  
		    var File = $(".file_inputupload").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#BannerHubTitle').after('<br>'+'<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;width:29px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#BannerHubDescription').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.oneInfo').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
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
	
	
	
	$('#publishWork').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishWorkTitle').val();  
		    var Description = $('#PublishWorkDesc').val();  
		    var File = $(".publishWorkImage").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishWorkTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWorkDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
			}
	}); 
	

	$('#publishLife').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishLifeTitle').val();  
		    var Description = $('#PublishLifeDesc').val();  
		    var File = $(".publishLifeImage").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishLifeTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWorkDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
			}
	});
	
	$('#publishLife').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishLifeTitle').val();  
		    var Description = $('#PublishLifeDesc').val();  
		    var File = $(".publishLifeImage").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishLifeTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWorkDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
			}
	}); 
	
	
	$('#publishWellbeing').on("click", function (e) {  
		    e.preventDefault();  
		    var MainTitle = $('#PublishWellBeingTitle').val();  
		    var Description = $('#PublishWellBeingDesc').val();  
		    var File = $(".publishWellBeingImage").val();
		    $(".error").remove();  
			if (MainTitle.length < 1) {  
		      $('#PublishWellBeingTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWellBeingDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
			}
	});
	
	$('#publishWowpride').on("click", function (e) {  
		    e.preventDefault();  
		    var Title = $('#PublishWellBeingTitle').val();  
		    var Description = $('#PublishWellBeingDesc').val();  
		    var File = $(".publishWellBeingImage").val();
		    $(".error").remove();  
			if (Title.length < 1) {  
		      $('#PublishWellBeingTitle').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Banner Title</span>');  
		    }
		    if (Description.length < 1) {  
		      $('#PublishWellBeingDesc').after('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Enter Description</span>');  
		    }
		    if (File.length < 1) {
			 $('.thumbnail').before('<span class="error" style="color:#ff3d97;margin: 0.8rem;font-size: 10px;">Please Upload Banner Image</span>');
			}
	});
	
});