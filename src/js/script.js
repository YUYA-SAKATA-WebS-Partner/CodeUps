
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
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    
  });
});
