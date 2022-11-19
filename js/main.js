jQuery(document).ready(($)=> {

  // Back to top button
  $(window).scroll(()=> {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(()=>{
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(()=> {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    let $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', (e)=> {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', (e)=> {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click((e)=> {
      let container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', ()=> {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      let target = $(this.hash);
      if (target.length) {
        let top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal',  (event)=> {
    let button = $(event.relatedTarget);
    let ticketType = button.data('ticket-type');
    let modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

  let clothes_images = ['./img/donativos/winter_clothes.png','./img/donativos/ropa1.jpeg', './img/donativos/ropa2.jpeg', './img/donativos/happy_clothes.png', './img/donativos/shoes.jpeg'];
  let toys_images = ['./img/donativos/toys1.png','./img/donativos/toys2.png', './img/donativos/toys3.jpeg', './img/donativos/toys4.jpeg', './img/donativos/toys5.jpg'];
  let candies_images = ['./img/donativos/candy1.jpg','./img/donativos/pinata1.jpeg', './img/donativos/candy2.jpeg', './img/donativos/pinata2.jpeg', './img/donativos/candy3.jpg'];
  let money_images = ['./img/donativos/food1.jpeg','./img/donativos/money1.jpeg', './img/donativos/food2.jpeg', './img/donativos/money2.png', './img/donativos/food3.png'];

  let donates = [
    {
      id: '#clothes',
      images: clothes_images,
    },
    {
      id: '#toys',
      images: toys_images
    },
    {
      id: '#candies',
      images: candies_images
    },
    {
      id:'#money',
      images: money_images
    }
  ]

  for (let don of donates) {
    let img = $(don.id), i = 0, speed = 500;
  window.setInterval(()=> {
    img.fadeOut(speed, ()=> {
      img.attr("src", don.images[(++i % don.images.length)]);
      img.fadeIn(speed);
    });
  }, 5000);
  }
  
  $('[data-toggle="tooltip"]').tooltip()
  
});
