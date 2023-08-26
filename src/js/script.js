
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ハンバーガーメニュー
$(".js-hamburger,.js-drawer,.drawer-nav__item").click(function () {
  $(".js-hamburger").toggleClass("is-active");
  $(".js-drawer").toggleClass("is-active");
});

});
