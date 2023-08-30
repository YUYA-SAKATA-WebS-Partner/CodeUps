
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $(".js-hamburger,.js-drawer,.drawer-nav__item").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
  });

  // mainview swiper
  var swiper = new Swiper(".js-top-swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    effect: "fade",
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // campaign swiper
  var swiper = new Swiper(".js-top-campaign-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 2000,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

});
