'use strict';

function hasbiSlider({
  pause = 3000,
  animationSpeed = 1000,
  pauseOnAction = false,
  pauseOnHover = false,
  animation = 'slideLeft'
} = {}) {

  //configuration
  var currentSlide = 1;

  //cache DOM
  var $slider = $('#slider');
  var $sliderContainer = $slider.find('.slides');

  var $firstImage = $sliderContainer.find('li:first-child');
  $sliderContainer.append('<li>' + $firstImage.html() + '</li>');



  var $slides = $sliderContainer.find('li');

  if (animation === 'slideRight') {
    $sliderContainer.css('margin-left', '-' + 100 * ($slides.length - 1) + '%');
    $sliderContainer.css('width', 100 * $slides.length + '%');
    $slides.css({
      'width': 100 / $slides.length + '%',
      'float': 'right'
    });
  } else if (animation === 'fade') {
    $sliderContainer.css('width', '100%');
    $slides.css({
      'width': '100%',
      'position': 'absolute',
      'opacity': '0'
    });
    $slides.eq(0).css('opacity', '1');
  }

  // slideNavigation
  $slider.append('<ul class="slide_nav_container"></ul>');

  var $sliderNav = $slider.find('.slide_nav_container');
  var $slideLinks;
  let slideObj = $slides;
  let slideArray = $.makeArray(slideObj);

  function slideNav() {

    for (var i = 0; i < ($slides.length - 1); i++) {

      $sliderNav.append('<li><button class=" slide_' + i + '"></button></li>');
      $slideLinks = $sliderNav.find('button');
      // $slideLinks.css({
      //
      // });
      $slideLinks.eq(currentSlide - 1).css({
        'background': 'rgba(255, 255, 255, 1)',
        'border-color': 'rgba(0, 0, 0, 1)'
      });

    }


  }

  slideNav();

  var lastAnimationSpeed = animationSpeed;
  var lastPause = pause;
  var interval;
  var clickNavStatus = false;

  function clickNav() {
    $.each($slideLinks, function(index, value) {
      $(this).click(function() {

        currentSlide = index + 1;

        if (animation === 'fade') {

          currentSlide = index;
          stopSlider();
          fadeSlide();

          if (pauseOnAction) {
            // if($slider.mouseenter()) stopSlider();
            // else if($slider.mouseleave()) startSlider(pause);
            $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
          } else {
            startSlider(pause);
          }



        } else if (animation === 'slideRight') {

          $sliderContainer.animate({
            'margin-left': '-' + 100 * ($slides.length - currentSlide) + '%'
          }, animationSpeed);
          $slideLinks.css('opacity', '0.5');
          $slideLinks.eq(currentSlide - 1).css('opacity', '1');
          if (pauseOnAction) {
            stopSlider();
          } else {
            startSlider(pause);
          }

        } else if (animation === 'slideLeft') {
          $sliderContainer.animate({
            'margin-left': '-' + 100 * (currentSlide - 1) + '%'
          }, animationSpeed);
          $slideLinks.css('opacity', '0.5');
          $slideLinks.eq(currentSlide - 1).css('opacity', '1');

          if (pauseOnAction) {
            stopSlider();
          } else {
            startSlider(pause);
          }

        }

      });
    });
  }

  clickNav();

  function fadeSlide() {

    $slides.css({
      'width': '100%',
      'position': 'absolute',
      'opacity': '0',
      'transition': 'opacity ' + ((animationSpeed + 100) / 1000) + 's ease-out 0s'
    });
    // $slideLinks.css('opacity', '0.5');
    // $slideLinks.eq(currentSlide).css('opacity', '1');
    // $slideLinks.css({
    //   'background': 'rgba(153, 153, 153, 1)',
    //   'border-color': 'rgba(255,255,255,0.9)'
    // });
    //
    // $slideLinks.eq(currentSlide).css({
    //   'background': 'rgba(255, 255, 255, 1)',
    //   'border-color': 'rgba(0, 0, 0, 1)'
    // });

    $slideLinks.css({
      'background': 'rgba(153, 153, 153, 1)',
      'border-color': 'rgba(255,255,255,0.9)'
    });

    $slideLinks.eq(currentSlide).css({
      'background': 'rgba(255, 255, 255, 1)',
      'border-color': 'rgba(0, 0, 0, 1)'
    });

    if (currentSlide == ($slides.length-1)) {
      $slideLinks.eq(0).css({
        'background': 'rgba(255, 255, 255, 1)',
        'border-color': 'rgba(0, 0, 0, 1)'
      });
    }

    $slides.eq(currentSlide).animate({
      'opacity': '1'
    }, animationSpeed, function() {
      animationSpeed = lastAnimationSpeed;

      currentSlide++;

      //if it's last slide, go to first
      if (currentSlide === $slides.length) {
        // $slideLinks.eq(0).css({
        //   'background': 'rgba(255, 255, 255, 1)',
        //   'border-color': 'rgba(0, 0, 0, 1)'
        // });
        currentSlide = 1;
      }

    });

  }

  function leftToRight() {

    $sliderContainer.css('width', 100 * $slides.length + '%');
    $slides.css({
      'width': 100 / $slides.length + '%',
      'float': 'left'
    });

    $sliderContainer.animate({
      'margin-left': '-=100%'
    }, animationSpeed, function() {
      $slideLinks.css('opacity', '0.5');
      $slideLinks.eq(currentSlide).css('opacity', '1');
      currentSlide++;
      //if it's last slide, go to first
      if (currentSlide === $slides.length) {
        currentSlide = 1;
        $slideLinks.eq(currentSlide - 1).css('opacity', '1');
        $sliderContainer.css('margin-left', 0);
      }
    });
  }

  function rightToLeft() {

    $sliderContainer.animate({
      'margin-left': '+=100%'
    }, animationSpeed, function() {
      currentSlide++;
      $slideLinks.css('opacity', '0.5');
      $slideLinks.eq(currentSlide - 1).css('opacity', '1');
      //if it's last slide, go to first
      if (currentSlide === $slides.length) {
        currentSlide = 1;
        $slideLinks.eq(currentSlide - 1).css('opacity', '1');
        $sliderContainer.css('margin-left', '-' + 100 * ($slides.length - 1) + '%');
      }
    });
  }

  function startSlider({
    time = pause
  }) {

    let animationMode = function() {
      //animate margin-left (slide left to right)
      if (animation === 'slideLeft') {
        leftToRight();
      } else if (animation === 'slideRight') {
        rightToLeft();
      } else if (animation === 'fade') {
        fadeSlide();
      }
    }

    stopSlider();
    interval = setInterval(function() {
      animationMode();
    }, time);

  }

  function stopSlider() {
    clearInterval(interval);
  }

  //listen for mouseenter and pause
  //resume on mouseleave
  if (pauseOnHover == true) {
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
  } else {
    startSlider(pause);
  }



}
