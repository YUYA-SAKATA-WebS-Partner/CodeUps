
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
    $(".js-header-inner").toggleClass("is-active");
  });

  //ドロワーメニュー展開時背景固定
  var state = false;
  var pos;
  $(".js-hamburger,.js-drawer").click(function(){
    if (state == false) {
      pos = $(window).scrollTop();
      $("body").addClass("fixed").css({"top": -pos});
      state = true;
    } else {
      $("body").removeClass("fixed").css({"top": 0});
      window.scrollTo(0, pos);
      state = false;
    }
  });
  

  // mainview swiper
  var swiper = new Swiper(".js-top-swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    effect: "fade",
    loop: true,
    speed: 600,

    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
  });

  // campaign swiper
  var swiper = new Swiper(".js-top-campaign-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 2000,

    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
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

  // アニメーション
  //要素の取得とスピードの設定
  var box = $('.js-colorbox'),
  speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
      if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
                image.css('opacity','1');
                $(this).css({'left':'0' , 'right':'auto'});
                $(this).animate({'width':'0%'},speed);
              })
          counter = 1;
        }
    });
  });

  // page-top
  var topBtn=$('.js-page-top');
  topBtn.hide();

  //ボタンの表示設定
  $(window).scroll(function(){
    if($(this).scrollTop()>80){
      // 画面を80pxスクロールしたら、ボタンを表示する
      topBtn.fadeIn();
    }else{
      // 画面が80pxより上なら、ボタンを表示しない
      topBtn.fadeOut();
    }
  });
  
  // ボタンをクリックしたら、スクロールして上に戻る
  topBtn.click(function(){
    $('body,html').animate({
    scrollTop: 0},500);
    return false;
  });

  // フッター手前でストップ
  $(".js-page-top").hide();
  $(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = $(".footer").innerHeight();
    if (scrollHeight - scrollPosition <= footHeight) {
    // ページトップボタンがフッター手前に来たらpositionとfixedからabsoluteに変更
      $(".page-top").css({
        position: "absolute",
        bottom: footHeight + 20,
      });
    } else {
      $(".page-top").css({
        position: "fixed",
        bottom: 20,
      });
    }
  });

  // カテゴリータブ
  var tabLink = $(".js-tab-item");
	// var limit = 4;
	$(".js-campaign-item").css('display','none');
	$(".js-campaign-item").css('display','flex');
	// for(var i = 0 ; i < limit ; i++) {
	// 	var limitNews = $(".news-content")[i];
	// 	$(limitNews).fadeIn();
	// }
	$(tabLink).click(function(){
		$(tabLink).removeClass("is-active");
		$(this).addClass("is-active");
		var filter = $(this).attr('data-filter');
		if (filter == 'category-all') {
			$(".js-campaign-item").css('display','none');
			$(".js-campaign-item").fadeIn();
			// for(i = 0 ; i < limit ; i++) {
			// 	limitNews = $(".js-campaign-item")[i];
			// 	$(limitNews).fadeIn();
			// }
		} else {
			$(".js-campaign-item").css('display','none');
      $(".js-campaign-item").filter('[data-category = "' + filter + '"]').fadeIn();
			// for(i = 0 ; i < limit ; i++) {
			// 	limitNews = $(".js-campaign-item").filter('[data-category = "' + filter + '"]')[i];
			// 	$(limitNews).fadeIn();
			// }
		}
	});

  $('.js-tab-item>a').click(function(){
    $('.js-tab-content').hide();
    $('.js-tab-item>a').removeClass('is-active');
    $(this).toggleClass('is-active');
    $(this.hash).fadeIn();
    return false;
  });
  $('.js-tab-item a[href^="#panel"]:eq(0)').trigger('click');

  //リンクからハッシュを取得
  var hash = location.hash;
  hash = (hash.match(/^#tab\d+$/) || [])[0];
  //リンクにハッシュが入っていればtabnameに格納
  if($(hash).length){
    var tabname = hash.slice(1) ;
  } else{
    var tabname = "tab1";
  }
 
  //コンテンツ非表示&amp;タブを非アクティブ
  $('.tabs .panel').hide();
  $('.tabs a').removeClass('active');
 
  //何番目のタブかを格納
  var tabno = $('.tabs li#' + tabname).index();
 
  //コンテンツ表示
  $('.tabs .panel').eq(tabno).fadeIn();
 
  //タブのアクティブ化
  $('.tabs a').eq(tabno).addClass('active');

});
