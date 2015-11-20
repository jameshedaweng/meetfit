var MF = [];

MF.tabInit = function(){
  $.get("/templates/" + $(".tab-bar-bottom-inner > .selected").data("template") + "/index.html", function(data){
    $(".main-container").html(data);
  });
};

MF.tabSwitch = function(){
  $(".tab-bar-bottom-inner > .item").click(function(){
    $(".tab-bar-bottom-inner > .selected").removeClass("selected");
    $(this).addClass("selected");
    $.get("/templates/" + $(this).data("template") + "/index.html", function(data){
      $('.main-container').fadeOut(100, function() {
        $('.main-container').html(data);
        $('.main-container').fadeIn(100);
        MF.menuInit();
      });
    });
  });
};

MF.accessibility = [];

MF.accessibilitySwitch = function(){
  $("body").on("change", ".accessibility-switch", function(){
    if($(this).is(":checked")){
      $("body").addClass($(this).data("func"));
      MF.accessibility.push($(this).data("func"));
    }
    else{
      $("body").removeClass($(this).data("func"));
      var index = MF.accessibility.indexOf($(this).data("func"));
      if (index > -1) {
        MF.accessibility.splice(index, 1);
      }
    }
  });
};

MF.accessibilityCheck = function(){
  $.each(MF.accessibility, function(index, value){
    $("#accessibility-switch-" + value).prop( "checked", true );
  });
};

MF.menuInit = function(){
  if($(".left-pane > .pane-inner > .group > .selected").length){
    $.get("/templates/" 
      + $(".left-pane > .pane-inner > .group > .selected").data("parent") 
      + "/partials/"
      + $(".left-pane > .pane-inner > .group > .selected").data("template")
      + ".html", function(data){
      $(".right-pane").html(data);
    });
  }
};

MF.menuSwitch = function(){
  $(".main-container").on("click", ".menu-item", function(){
    $(".menu-item.selected").removeClass("selected");
    $(this).addClass("selected");
    $.get("/templates/" + $(this).data("parent") + "/partials/" + $(this).data("template") + ".html", function(data){
      $('.right-pane').fadeOut(100, function() {
        $('.right-pane').html(data);
        $('.right-pane').fadeIn(100);
        MF.accessibilityCheck();
      });
    });
  });
};

$(document).ready(function(){
  MF.tabInit();
  MF.tabSwitch();
  MF.accessibilitySwitch();
  MF.menuSwitch();
});