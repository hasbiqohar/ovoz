// "use strict";

$(document).ready(function() {

  // Toggle Navigation

  let $menuToggle = $('.toggle_navigation');
  let $bar = $('.bar');
  let $mainMenu = $('.main_navigation');
  let $mainMenuContainer = $('.main_navigation ul');
  let $eachMenu = $('.main_navigation li');


  for (var i = 0; i < $eachMenu.length; i++) {
    $eachMenu.addClass('animated');
  }

  let menuLarge = function () {

    for (var i = 0; i < $eachMenu.length; i++) {
      if ($eachMenu.eq(i).hasClass('fadeInUp')) {

        $eachMenu.eq(i).addClass('fadeOut').css('animation-delay', '0s').removeClass('fadeInUp');
      } else {
        $eachMenu.eq(i).removeClass('fadeOutRight').removeClass('fadeInRight').css('animation-delay', 0);
        let animateTime = (i * 0.1) + 0.1 + 's';
        $eachMenu.eq(i).removeClass('fadeOut').addClass('fadeInUp').css('animation-delay', animateTime);
      }
    }
  }

  let menuSmall = function () {

    $eachMenu.each(function () {
      $(this).addClass('fadeOutRight');
    });

    let eachMenuRise = function () {
      $eachMenu.each(function (index) {
        let animateDelay = (index * 0.1) + 0.6 + 's';
        let animateTime = (index * 0.1) + 0.3 + 's';
        $(this).addClass('fadeInRight').removeClass('fadeOutRight').css({
          'animation-delay' : animateDelay,
          'animation-duration' : animateTime
        });

      });
    }

    let eachMenuFall = function () {
      $eachMenu.each(function (index) {
        let animateDelay = (index * 0.1) + 0.1 + 's';
        let animateTime = (index * 0.1) + 0.3 + 's';
        $(this).css({
          'animation-delay' : animateDelay,
          'animation-duration' : animateTime
        }).removeClass('fadeInRight');

      });

    }

    $mainMenu.toggleClass('active');
    let $header = $('header');

    $header.addClass('active');
    // console.log($mainMenu.hasClass('active'));

    if ($mainMenu.hasClass('active')) {
      $mainMenuContainer.addClass('active');
      eachMenuRise();
    } else if(!$mainMenu.hasClass('active')) {
      eachMenuFall();
      $mainMenuContainer.removeClass('active');
      // $mainMenu.bind('transitionend oTransitionEnd webkitTransitionEnd',function () {
        $header.removeClass('active');

      // });

    }

  }

  $menuToggle.click(function() {
    $bar.toggleClass('active');
    // $mainMenu.toggleClass('active');

    let $window = $(window);

    function checkWidth() {
        let windowSize = $window.width();
        if (windowSize < 600) {
          //if the window is greater than 440px wide then turn on jScrollPane..
          menuSmall();
        }else {
          menuLarge();
        }

    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

  });

  // Toggle Scroll header

  $(window).scroll(function() {

    let scrollPage = $(this).scrollTop();
    let windowWidth = $(window).width();
    let $header = $('header');

    if ((scrollPage>100)||(windowWidth<600 && scrollPage>30)) {
      $header.removeClass('header_top').addClass('header_scroll');
    } else {
      $header.removeClass('header_scroll').addClass('header_top');
    }

  });

  // Slider HOME
  hasbiSlider({
    pause: 5000,
    animationSpeed: 750,
    pauseOnAction: true,
    pauseOnHover: false,
    animation: 'fade'
  });

  function slideSelector() {

    this.sliderHome = document.querySelectorAll('.slides li');
    let li = this.sliderHome;

    for (var i = 0; i < li.length; i++) {

      li[i].sliderh1 = li[i].querySelector('h1');
      let lih1 = li[i].sliderh1;

      li[i].sliderSpan = li[i].querySelectorAll('span');
      let liSpan = li[i];
      liSpan[i] = li[i].sliderSpan;

      li[i].sliderClickHere = li[i].querySelector('a');
      let aLink = li[i].sliderClickHere;

      lih1.classList.add('animated');

      for (var j = 0; j < liSpan[i].length; j++) {
        liSpan[i][j].classList.add('animated');
        liSpan[i][j].style.animationDuration = "0.3s";
      }

      aLink.classList.add('animated');
      aLink.style.animationDelay = (0.5*liSpan[i].length) + "s";

    }

  }

  let slides = new slideSelector();

  let slideView = setInterval(function() {

    let slider = slides.sliderHome;
    for (var j = 0; j < slider.length; j++) {


      let sliderSpan = slider[j];
      sliderSpan[j] = slider[j].sliderSpan;
      for (var i = 0; i < sliderSpan[j].length; i++) {

        function slideAnimation(slide) {

          this.slide = slide;
          let action = this.slide;

          this.fadeInSlide = function () {
            action.classList.remove('fadeOut');
            action.classList.add('fadeIn');
          }

          this.fadeInUpSlide = function() {
            action.classList.remove('fadeOut');
            action.classList.add('fadeInUp');
            action.style.animationDelay = (0.5*i) + "s";
          }

          this.fadeDownSlide = function () {
            action.classList.remove('fadeOut');
            action.classList.add('fadeInDown');
          }

          this.fadeOutSlide = function() {
            action.classList.remove('fadeIn');
            action.classList.remove('fadeInUp');
            action.classList.remove('fadeInDown');
            action.classList.add('fadeOut');
            sliderSpan[j][i].style.animationDelay = (0*i) + "s";
          }

        }

        let h1Slide = new slideAnimation(slider[j].sliderh1)
        let spanSlide = new slideAnimation(sliderSpan[j][i]);
        let linkSlide = new slideAnimation(slider[j].sliderClickHere);

        if (slider[j].style.opacity == 1) {
          spanSlide.fadeInUpSlide();
          linkSlide.fadeDownSlide();
        } else {
          spanSlide.fadeOutSlide();
          linkSlide.fadeOutSlide();
        }

      } // end for loop i

    } // end for loop j

  });


});
