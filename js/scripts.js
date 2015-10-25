// jQuery Strict Mode
jQuery(function($){
"use strict";

/*--------------------------------------------------------------
DOCUMENT READY
--------------------------------------------------------------*/
$(document).ready(function(){

  var winWidth = $(window).width();
  var winHeight = $(window).height();

  var navItems = $('header nav').html();// Get navigation links from main menu
  $('.mobile-menu-container').append(navItems);// Append them to the side navigation

  $('section').each(function(){
    $(this).append('<div class="blocking"></div>');
  });

  $('<header class="fixed"><nav>'+$('header nav').html()+'</nav></header>').insertAfter('header.default');// Clone the default nav and create a fixed nav
  $('header.fixed, .blocking').hide();// Hide fixed nav on load

  $('.mobile-menu-btn').click(function(){
    $(this).find('span').toggleClass('active');// Add active class to hamburger icon
    $(this).siblings('.mobile-menu-container').toggleClass('active');// Add active class to menu container
    return false;
  });

  $('header nav a').click(function(){
      goToByScroll($(this).attr('href'));// Scroll to the clicked section
      return false;
  });
  $('.mobile-menu-container a').click(function(){
      mobileGoToByScroll($(this).attr('href'));// Scroll to the clicked section (MOBILE)
      return false;
  });

  $('.dg-wrapper a, .dg-wrapper-g a').click(function(){
    return false;
  });

  // Create couple gallery popup
  var imgCounter = 0;
  var activeSlide = '';
  $('.il-scattered-gallery a').each(function(){
    if( imgCounter == 0 ){ activeSlide = 'active-slide'; }else{  activeSlide = ''}
    var img = $(this).html();
    var imgThumb = '<li data-slide-number="'+imgCounter+'" href="" class="'+activeSlide+'">'+img+'</li>';
    var imgSrc = $(this).find('img').attr('src');
    $('#couple-slideshow').append('<li style="background:url('+imgSrc+') no-repeat center; background-size:cover;">'+img+'</li>');
    $('.couple-thumbs').append(imgThumb);
    imgCounter++;
  });

  // Launch the gallery popup
  $('#gallery-launcher').click(function() {
    $('.couple-slideshow-wrap').append('<a class="close-btn"><em>X</em>Close</a>');
    $('.blocking').fadeIn(500);
    $('.couple-slideshow-wrap').css('z-index','2001');
    goToByScroll('#couple-slideshow');
    setTimeout(function(){
      $('.couple-slideshow-wrap').addClass('visible');
    }, 100);
    return false;
  });

  $(document).on('click','.close-btn',function(){
    $('.couple-slideshow-wrap').removeClass('visible');
    setTimeout(function(){
      $('.couple-slideshow-wrap').css('z-index','');
    }, 500);
    $(this).fadeOut(500).delay(500).remove();
    $('.blocking').fadeOut(500);
    return false;
  });

  // Make header bg full height of screen
  if(winWidth < 641){
    $('.blog header, .single header').css('height', winHeight+'px');
  }

  // SCROLL FUNCTIONS
  $(window).scroll(function() {

    // console.log($(window).scrollTop());

    if(winWidth > 1024){

      parallaxScroll();

      $('section').each(function(){
        var currentSection = $(this);
        var currentId = $(this).attr('id');
        // For each section that comes into view add active class to corresponding side nav link
        if(currentSection.isOnScreen()){
          $('a[href="#'+currentId+'"]').closest('li').siblings().find('a').removeClass('active');
          $('a[href="#'+currentId+'"]').addClass('active');
        }
      });

      if( $('body').hasClass('home') ){
        if( $('#recent-posts').isOnScreen() ){
          $('#recent-posts .blog-post').addClass('on-screen');
        }

        if( $('#rsvp').isOnScreen() ){
          $('.rsvp-form-wrap').addClass('on-screen');
        }

        if( $('#schedule').isOnScreen() ){
          $('.schedule-content-wrap').addClass('on-screen');
        }

        if( $('#contact').isOnScreen() ){
          $('.contact-form-wrap').addClass('on-screen');
        }

      }

      if( $('body').hasClass('blog') || $('body').hasClass('single') ){
        if( $(window).scrollTop() >= 83 ){
          $('header.fixed').fadeIn(400);
        }
        else{
          $('header.fixed').fadeOut(300);
        }
      }

      if( $('body').hasClass('home') ){
        if( $(window).scrollTop() >= 350 ){
          $('header.fixed').fadeIn(400);
        }
        else{
          $('header.fixed').fadeOut(300);
        }
      }

    }// end winWidth > 1024

    if(winWidth < 1025){

      $('section').each(function(){
        var currentSection = $(this);
        var currentId = $(this).attr('id');
        // For each section that comes into view add active class to corresponding side nav link
        if(currentSection.isOnScreen()){
          $('.mobile-menu-container a[href="#'+currentId+'"]').closest('li').siblings().find('a').removeClass('active');
          $('.mobile-menu-container a[href="#'+currentId+'"]').addClass('active');
        }
      });

    }// end winWidth < 1025

  });// End window.scroll()

});

/*--------------------------------------------------------------
AFTER DOCUMENT LOADS
--------------------------------------------------------------*/
$(window).load (function(){

  if( $('body').hasClass('home') ){
    
    // Begin "create sliders for all the galleries"

    var bridesmaidsSlider = [];
    var groomsmenSlider = [];
    var coupleSlider = [];
    var slider;
    var sliderTwo;
    var sliderThree;
    var coupleSlideshow;

    // Bridesmaids
    $('#bridesmaid-carousel a img').each(function(){
      bridesmaidsSlider.push($(this).attr('src'));
    });
    for ( var i = 0, l = bridesmaidsSlider.length; i < l; i++ ) {
      $('.bridemaids-mobile-slider').append('<img src="'+bridesmaidsSlider[ i ]+'" alt="" />')
    }
    slider = $('.bridemaids-mobile-slider').bxSlider({
      auto: true,
      mode: 'horizontal',
      speed: 1000,
      pager: false,
      controls: false,
      pause: 4000
    });
    slider.startAuto();

    // Groomsmen
    $('#groomsmen-carousel a img').each(function(){
      groomsmenSlider.push($(this).attr('src'));
    });
    for ( var i = 0, l = groomsmenSlider.length; i < l; i++ ) {
      $('.groomsmen-mobile-slider').append('<img src="'+groomsmenSlider[ i ]+'" alt="" />')
    }
    sliderTwo = $('.groomsmen-mobile-slider').bxSlider({
      auto: true,
      mode: 'horizontal',
      speed: 1000,
      pager: false,
      controls: false,
      pause: 4100
    });
    sliderTwo.startAuto();

    // Couple
    $('.il-scattered-gallery a img').each(function(){
      coupleSlider.push($(this).attr('src'));
    });
    for ( var i = 0, l = coupleSlider.length; i < l; i++ ) {
      $('.couple-mobile-slider').append('<img src="'+coupleSlider[ i ]+'" alt="" />')
    }
    sliderThree = $('.couple-mobile-slider').bxSlider({
      auto: true,
      mode: 'horizontal',
      speed: 1000,
      pager: false,
      controls: false,
      pause: 4200
    });
    sliderThree.startAuto();

    // End "create sliders for all the galleries"

    coupleSlideshow = $('#couple-slideshow').bxSlider({
      mode: 'fade',
      speed: 1000,
      auto: false,
      controls: false,
      pager: false
    });

    $('.couple-thumbs').bxSlider({
      minSlides: 5,
      maxSlides: 5,
      slideWidth: 178,
      slideMargin: 0,
      speed: 750,
      pager: false,
      prevText: 'Previous'
    });

    $('.couple-thumbs li').click(function(){
      var slideIndex = $(this).attr('data-slide-number');
      coupleSlideshow.goToSlide(slideIndex);
      $(this).siblings('li').removeClass('active-slide');
      $(this).addClass('active-slide');
    });

  }// end if body.home

});

});// End jQuery(function($)

/*--------------------------------------------------------------
THE FUNCTIONS
--------------------------------------------------------------*/
/**
  * @desc checks if current element exists
  * @param none
  * @return int - the number of elements present, > 0 = element exists
*/
jQuery.fn.exists = function(){ return this.length > 0; }

/**
  * @desc checks if current element is on screen or within viewport
  * @param none
  * @return int - the coordinates of the window vs. the element
*/
jQuery.fn.isOnScreen = function(){
       
    var win = $(window);
       
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
      
    var elemtHeight = this.height()/2;// Get half of the height of current element
    elemtHeight = Math.round(elemtHeight);// Round it to whole humber
       
    var bounds = this.offset();// Coordinates of current element
    bounds.top = bounds.top + elemtHeight;// Top is redefined as half of current element's height
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
             
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
     
}

/**
  * @desc checks if current element is 100% visible within viewport
  * @param none
  * @return int - the coordinates of the window vs. the element
*/
jQuery.fn.isFullyVisible = function(){
       
    var win = $(window);
       
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
      
    var elemtHeight = this.height();// Get the full height of current element
    elemtHeight = Math.round(elemtHeight);// Round it to whole humber
       
    var bounds = this.offset();// Coordinates of current element
    bounds.top = bounds.top + elemtHeight;// Top is redefined as half of current element's height
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
             
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
     
}

/**
  * @desc create equal height columns
  * @param object - the elements to apply equal heights to
  * @return none
*/
jQuery.fn.equalHeights = function(){
  var colSelector = this.selector;// Get the selector of the object
  var newHeight;
  var colHeights = [];
  $(colSelector).each(function(){
    var singleCol = $(this).outerHeight();// Get the outerHeight of a single column
    colHeights.push(singleCol);// Push the single height into the array
    newHeight = Math.max.apply(Math,colHeights);// Get the tallest column from the array
  });
  colSelector.css('height', newHeight+'px');// Apply the tallest height to all columns
}

/**
  * @desc scroll to the specified anchor section
  * @param int id - the id of the section to scroll to
  * @return none
*/          
function goToByScroll(id){
  var scrollAmount = $(id).offset().top;
  if( id == '#couple' ){
    $('html,body').animate({
      // scrollTop: 720},
      scrollTop: 610},
    'slow');
  }
  else{
    $('html,body').animate({
      scrollTop: (scrollAmount - 107)},
    'slow');
  }
}

/**
  * @desc scroll to the specified anchor section (MOBILE)
  * @param int id - the id of the section to scroll to (MOBILE)
  * @return none
*/          
function mobileGoToByScroll(id){
  var scrollAmount = $(id).offset().top;
  if( id == '#couple' ){
    $('html,body').animate({
      scrollTop: 660},
    'slow');
  }
  else{
    $('html,body').animate({
      scrollTop: (scrollAmount - 60)},
    'slow');
  }
}

/**
  * @desc Parallax scrolling on different elements
  * @param none
  * @return none
*/
function parallaxScroll(){
  var scrolled = $(window).scrollTop();

  if( $('body').hasClass('home') ){
    $('header.default nav').css('margin-top', '-' + Math.round( (scrolled * 0.3) ) + 'px');
    $('#countdown h2').css('top', Math.round(515 - (scrolled * 0.3) ) + 'px');
    $('#default-countdown').css('top', Math.round(515 - (scrolled * 0.3) ) + 'px');
  }

  if( $('body').hasClass('blog') || $('body').hasClass('single') ){
    $('h1').css({
      'position' : 'relative',
      'top' : '-' + Math.round( (scrolled * 0.3) ) + 'px'
    });
  }

}