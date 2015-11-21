var MF = [];

MF.tabInit = function(){
  $.get("/templates/" + $(".tab-bar-bottom-inner > .selected").data("template") + "/index.html", function(data){
    $(".main-container").html(data);
    MF.menuInit();
    MF.pillInit();
    MF.mapInit();
    MF.getEvents();
    MF.getRecommandations();
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
        MF.pillInit();
        MF.getEvents();
        MF.getRecommandations();
        setTimeout(function(){MF.mapInit()}, 400);
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

MF.pillInit = function(){
  if($(".pill-switch").length){
    $("." + $(".pill-switch").data("bind")).hide();
    $("." + $(".pill-switch > .selected").data("bind")).show();
    $(".notification-body").css("left", "100px");
    $(".notification-body").removeClass("left-expanded");
    $(".notification-body").removeClass("right-expanded");
    $("#unread-count").text($(".notification-unread").length);
  }
};

MF.pillSwitch = function(){
  $(".main-container").on("click", ".pill-item", function(){
    $(".pill-item.selected").removeClass("selected");
    $(this).addClass("selected");
    $("." + $(this).parent().data("bind")).hide();
    $("." + $(".pill-switch > .selected").data("bind")).show();
  });
};

MF.readNotification = function(){
  $(".main-container").on("click", ".read", function(){
    $(this).parent().parent().toggleClass("notification-unread");
    MF.pillInit();
  });
};

MF.deleteNotification = function(){
  $(".main-container").on("click", ".delete", function(){
    $(this).parent().parent().fadeOut(400, function() { 
      $(this).remove();
      MF.pillInit();
    });
  });
};

MF.swipeNotification = function(){
  $(".main-container").on("swipeleft", ".notification-body", function(){
    if(!$(this).hasClass("right-expanded")){
      $(this).css("left", "0px");
      $(this).addClass("left-expanded");
    }
    else{
      $(this).css("left", "100px");
      $(this).removeClass("right-expanded");
    }
  });
  $(".main-container").on("swiperight", ".notification-body", function(){
    if(!$(this).hasClass("left-expanded")){
      $(this).css("left", "200px");
      $(this).addClass("right-expanded");
    }
    else{
      $(this).css("left", "100px");
      $(this).removeClass("left-expanded");
    }
  });
};

MF.getEvents = function(){
  if($(".my-event-list").length){
    $.get("/data/events.json", function(data){
      var eventItems = "";
      var eventItemStart = '<div class="event-list-item"><div class="event-item-actions"><div class="swipe-action details"><i class="bi_editorial-left-align"></i><div class="text">Details</div></div><div class="swipe-action not-interested"><i class="bi_interface-box-cross"></i><div class="text">Not Going</div></div></div><div class="event-item-body">';
      var eventItemEnd = '</div></div>';
      $.each(data, function(index, value){
        eventItems += eventItemStart;
        eventItems += '<div class="image-container"><img src="http://lorempixel.com/200/400/sports/';
        eventItems += index + 1;
        eventItems += '"></div>';
        eventItems += '<div class="content-container"><div class="text title">';
        eventItems += value.name_event;
        eventItems += '</div><div class="text date">Date: ';
        eventItems += value.date;
        eventItems += '</div><div class="text cost">Cost: ';
        eventItems += value.costs;
        eventItems += ' €</div><div class="text extra-info">';
        eventItems += value.extra_info;
        eventItems += '</div><div class="text people">';
        eventItems += value.number_people_needed;
        eventItems += ' Places available</div></div>';
        eventItems += eventItemEnd;
      });
      $(".my-event-list").html(eventItems);
    });
  }
};

MF.getRecommandations = function(){
  if($(".recommand-list-container").length){
    $.get("/data/events.json", function(data){
      var eventItems = "";
      var eventItemStart = '<div class="event-list-item"><div class="event-item-actions"><div class="swipe-action details"><i class="bi_editorial-left-align"></i><div class="text">Details</div></div><div class="swipe-action not-interested"><i class="bi_interface-box-cross"></i><div class="text">Not Interested</div></div></div><div class="event-item-body">';
      var eventItemEnd = '</div></div>';
      $.each(data, function(index, value){
        eventItems += eventItemStart;
        eventItems += '<div class="image-container"><img src="http://lorempixel.com/200/400/sports/';
        eventItems += index + 3;
        eventItems += '"></div>';
        eventItems += '<div class="content-container"><div class="text title">';
        eventItems += value.name_event;
        eventItems += '</div><div class="text date">Date: ';
        eventItems += value.date;
        eventItems += '</div><div class="text cost">Cost: ';
        eventItems += value.costs;
        eventItems += ' €</div><div class="text extra-info">';
        eventItems += value.extra_info;
        eventItems += '</div><div class="text people">';
        eventItems += value.number_people_needed;
        eventItems += ' Places available</div></div>';
        eventItems += eventItemEnd;
      });
      $(".recommand-list-container").html(eventItems);
    });
  }
};

MF.swipeEvents = function(){
  $(".main-container").on("swipeleft", ".event-item-body", function(){
    if(!$(this).hasClass("right-expanded")){
      $(this).css("left", "0px");
      $(this).addClass("left-expanded");
    }
    else{
      $(this).css("left", "100px");
      $(this).removeClass("right-expanded");
    }
  });
  $(".main-container").on("swiperight", ".event-item-body", function(){
    if(!$(this).hasClass("left-expanded")){
      $(this).css("left", "200px");
      $(this).addClass("right-expanded");
    }
    else{
      $(this).css("left", "100px");
      $(this).removeClass("left-expanded");
    }
  });
};

MF.mapInit = function(){
  if($("#map").length){
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNoZWRhd2VuZyIsImEiOiJxNGxvT1h3In0.q1gGwhVt7lQ7Tji5NV2jUQ';
    MF.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jameshedaweng/cih8z9cgn001wbwm5otha9g35', 
      center: [-3.790124, 43.476921],
      zoom: 13
    });
    MF.map.addControl(new mapboxgl.Navigation());
  }
};

$(window).load(function(){
  setTimeout(function(){
    $(".splash").fadeOut(800);
  }, 1200);
});

$(document).ready(function(){
  MF.tabInit();
  MF.tabSwitch();
  MF.accessibilitySwitch();
  MF.menuSwitch();
  MF.pillSwitch();
  MF.readNotification();
  MF.deleteNotification();
  MF.swipeNotification();
  MF.swipeEvents();
});