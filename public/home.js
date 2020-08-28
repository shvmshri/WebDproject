

$(".service").mouseenter(function(){
   $(this).css("background-color","#22746b");
   $(this).find(".icon").css("color","white");
   $(this).find("hr").css("border-color","white");
   $(this).find("p").css("color","black")

})

$(".service").mouseleave(function(){
   $(this).css("background-color","#e0ebe8");
   $(this).find(".icon").css("color","#22746b");
   $(this).find("hr").css("border-color","#22746b");
   $(this).find("p").css("color","#545454")

})
