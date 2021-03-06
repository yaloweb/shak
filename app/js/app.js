import $ from 'jquery'
window.jQuery = $
window.$ = $

import Inputmask from "inputmask"
import autosize from "autosize"
import 'slick-slider'

document.addEventListener('DOMContentLoaded', () => {

	let phoneMask = new Inputmask({
  	mask: "+7 999 999 99 99",
  	showMaskOnHover: false
  });

  let decimalMask = new Inputmask('decimal', {
    rightAlign: false
  })

  phoneMask.mask('.phone-mask');

  decimalMask.mask('.decimal');

  autosize(document.querySelectorAll('textarea.form-control'));

  function openPopup(id) {
    let notCurrentPopups = $(`.popup-wrapper:not(${id})`);
    notCurrentPopups.removeClass('opened');
    setTimeout(() => {
      notCurrentPopups.hide()
    }, 400);
    $(id).show();
    setTimeout(() => {
      $(id).addClass('opened')
    }, 50);
  }

  function closePopup(e) {
    e !== undefined ? e.preventDefault() : '';
    $('.popup-wrapper').removeClass('opened');
    setTimeout(() => {
      $('.popup-wrapper').hide();
      $('.video-frame').find('video')[0].pause();
    }, 400);
  }

  $(document).on('click', '.open-popup', function(e) {
    e.preventDefault();
    let id = $(this).attr('href');
    openPopup(id);
  });

  $('.popup-close').on('click', closePopup);
  $('.popup-bg').on('click', closePopup);
  
  $(document).on('click', '.number-minus', function () {
    var input = $(this).parent().find('.number-input');
    console.log($(this).parent().find('.number-minus'));
    if (parseInt(input.val()) > 1) {
      input.val(parseInt(input.val()) - 1);
      if ( parseInt($(this).parent().find('.number-input').val()) < 2 ) {
        $(this).parent().find('.number-minus').prop('disabled', true);
      }
    }
    else if (parseInt(input.val()) < 3) {
      $(this).parent().find('.number-minus').prop('disabled', true);
    }
  });

  $(document).on('click', '.number-plus', function () {
    var input = $(this).parent().find('.number-input');
    input.val(parseInt(input.val()) + 1);
    $(this).parent().find('.number-minus').prop('disabled', false);
  });

  $('.number-group').each(function() {
    if ( $(this).find('.number-input').val() == '1' ) {
      $(this).find('.number-minus').prop('disabled', true);
    }
  });

  $('.callback-form, .contacts-form').on('submit', function(e) {
    e.preventDefault();
    openPopup('#callback-success');
  });

  $('.close-popup').on('click', function(e) {
    closePopup(e)
  });

  $('.up-link').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 400)
  });

  $('.menu-link').on('click', function(e) {
    e.preventDefault();
    let ths = $(this).attr('href');
    if ( $(ths).length > 0 ) {
      $('.menu-link').removeClass('active');
      $(this).addClass('active');
      $('html, body').animate({
        scrollTop: $(ths).offset().top
      }, 1000)
      $('.header-right').removeClass('opened')
    }
  });

  $('.footer-links a').on('click', function(e) {
    e.preventDefault();
    let ths = $(this).attr('href');
    if ( $(ths).length > 0 ) {
      $('html, body').animate({
        scrollTop: $(ths).offset().top
      }, 1000)
    }
  });

  $('.menu-btn').on('click', function(e) {
    e.preventDefault();
    $('.header-right').toggleClass('opened')
  });

  let testimonials = $('.testimonials');

  // function initTestimSlider() {
    // if ( $(window).width() < 576 ) {
      testimonials.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        draggable: false,
        infinite: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 0,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      })
  //   }
  //   else {
  //     if ( testimonials.hasClass('slick-initialized') ) {
  //       testimonials.unslick()
  //     }
  //   }
  // }

  initTestimSlider();

  $('.our-production-video-link').on('click', function(e) {
    e.preventDefault();
    let ths = $(this),
        src = ths.data('src'),
        frame = $('.video-frame');
    if ( frame.find('video').length === 0 ) {
      frame.append(`<video src="${src}" controls></video>`);
    }
    frame.find('video')[0].play()
    openPopup('#video-popup')
  });

  $(document).on('click', function(e) {
    let tg = $(e.target);
    if ( !tg.closest('.header-row').length ) {
      $('.header-right').removeClass('opened')
    }
  });

  $(window).on('resize', function() {
    initTestimSlider();
  });

})
