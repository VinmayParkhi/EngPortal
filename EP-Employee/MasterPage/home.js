$(document).ready(function(){
       $( window ).on( "load", function() {
          
      
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-content").addClass("onchangeClass2");  
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-root").addClass("onchangeClass1");  
        $("#spjs_tiles_placeholder_01-00 .spjs-tile-content").toggleClass("onchangeClass");        
   		//$("#WebPartWPQ5").addClass("calenderWidth");        


 });
    $('.arrow').on('click',function(){
        $('.contentWr').toggleClass('collapsedView');
    });

    $(".arrow").on("click", function () {
        $(".cardhide").toggleClass("imagenone1");
        $(".cards").toggleClass("d-none");
        $(".cards img").toggleClass("mx-auto");
        $(".arrow").toggleClass("arrow1");
        $(".sidebar .nav-links li").toggleClass("linkName");
        $(".sidebar").toggleClass("sidebarMin");
        $(".link_name").toggleClass("d-none");
        $(".content").toggleClass("content1");       
        $("#spjs_tiles_placeholder_01-00 .spjs-tile-content").toggleClass("changeWidth");        
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-content").toggleClass("changeWidth1");  
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-root").toggleClass("changeWidth3");       
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap").toggleClass("changeWidth2");
        $(".cm_calendar").toggleClass("cm_calendar1");
        //$("#WebPartWPQ5").toggleClass("calenderWidth"); 
        $("#spjs_tiles_placeholder_01-00 .spjs-tile-content").toggleClass("onchangeClass");        

                $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-content").toggleClass("onchangeClass2");  
        $("#spjs_tiles_placeholder_01_spjs_tile_wrap .spjs-tile-root").toggleClass("onchangeClass1");    

        
    });
    
    // For active menu

   $('.mx-auto').each(function (index, element) {

        $(this).removeClass("activeli");

    });

    $("#" + localStorage["currentLi"]).addClass("activeli");



/*
   $('.activeliimg').each(function (index, element) {


       $(this).removeClass("activeliimgbk");
 
       if ($(this).attr("alt") == localStorage["currentImg"]) {
            $(this).parent().addClass('activeli');            
            $(this).addClass("activeliimgbk");
       }


  

   });
   
 */

});


 /*
// For navigation

$(".mx-auto").on("click", function () {

    localStorage["currentLi"] = $(this).attr("id");

    localStorage["currentImg"] = $($(this).find("img")[0]).attr("alt");

});

*/



    $('.input-group-text input').bind('keyup change', function(ev) {
        // pull in the new value
        var searchTerm = $(this).val();
 
        // disable highlighting if empty
        if ( searchTerm ) {
            // highlight the new term
            $('body').highlight( searchTerm );
        }
    });


// let arrow = document.querySelectorAll(".arrow");
//             for (var i = 0; i < arrow.length; i++) {
//                 arrow[i].addEventListener("click", (e) => {
//                     let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
//                     arrowParent.classList.toggle("showMenu");
//                 });
//             }
//             let sidebar = document.querySelector(".sidebar");
//             let sidebarBtn = document.querySelector(".toggleImg");
//             console.log(sidebarBtn);
            
//             $(function () {
//                 /* console.log("width: "+ document.body.clientWidth); */

//                 resizeScreen();
//                 $(window).resize(function () {
//                     resizeScreen();
//                 });
//                 $('.toggleImg').click(function () {

//                     if (document.body.clientWidth > 400) {
//                         $('.sidebar').toggleClass('close');
//                     } else {
//                         $('.sidebar').toggleClass('small-screen');
//                     }
//                 });

//                 function resizeScreen() {
//                     if (document.body.clientWidth < 400) {
//                         $('.sidebar').addClass('close');
//                     } else {
//                         $('.sidebar').removeClass('close');
//                     }
//                 }
//             });
//             $(".toggleImg").on("click", function () {
//                 $(".sidebar .nav-links li").toggleClass("colorClass")

//             });