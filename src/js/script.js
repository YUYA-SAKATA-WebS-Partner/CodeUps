
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  // ハンバーガーメニュー
  $(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
    $(".header__inner").toggleClass("is-active");
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


  // =============================
  // カテゴリータブ(campaign,voice)
  // =============================
  $('.js-tab-item').click(function() {
    // クリックされたタブのデータ属性からカテゴリーを取得
    var category = $(this).data('category');

    // タブの表示を切り替えるための処理
    $('.js-tab-content').hide();
    $('.js-tab-item').removeClass('is-active');
    $(this).toggleClass('is-active');

    // カテゴリーが "all" の場合、すべての記事を表示
    if (category === 'all') {
        $('.js-tab-content').fadeIn();
    } else {
        // カテゴリーが "all" 以外の場合、該当するカテゴリーの記事のみを表示
        $('.js-tab-content').filter('[data-category="' + category + '"]').fadeIn();
    };
  });

  // =============================
  // FAQアコーディオン
  // =============================
  $('.js-accordion-header').click(function(){
    $(this).next('.accordion__body').slideToggle(300);
    $(this).toggleClass('is-open');
  });

  // =============================
  // アーカイブアコーディオン
  // =============================
  $('.js-archive-accordion__header').click(function(){
    $(this).next('.archive-accordion__body').slideToggle(300);
    $(this).toggleClass('is-open');
  });

  // =============================
  // modal
  // =============================
  var modal = $('.js-modal');
  var thinImage = $('.js-modal-trigger:nth-child(6n+1)>img, .js-modal-trigger:nth-child(6n+6)>img');
  var wideImage = $('.js-modal-trigger:nth-child(6n+2)>img, .js-modal-trigger:nth-child(6n+3)>img, .js-modal-trigger:nth-child(6n+4)>img, .js-modal-trigger:nth-child(6n+5)>img')

    // 横長の画像をクリックしたときの処理
    wideImage.click(function() {
        var imageSrc = $(this).attr('src');
        openModal(imageSrc);
    });

    // 縦長の画像をクリックしたときの処理
    thinImage.click(function() {
        var thinImageSrc = $(this).attr('src');
        openThinModal(thinImageSrc);
    });

    // モーダル外をクリックしたときの処理
    modal.click(function(event) {
        if (event.target === this) {
            closeModal();
        }
    });

    function openModal(imageSrc) {
        $('.js-modal-image>img').attr('src', imageSrc).css({
          'aspect-ratio':'920 / 586',
          'object-fit':'cover'
        });
        modal.css('display', 'block');
        $('.modal__content').css('width', 'min(92%, 920px)');
        $('body').css('overflow', 'hidden'); // スクロールを無効にする

        modal.addClass('show');
    }

    function openThinModal(thinImageSrc) {
        $('.js-modal-image>img').attr('src', thinImageSrc).css({
          'aspect-ratio':'492 / 746',
          'object-fit':'cover'
        });
        modal.css('display', 'block');
        $('.modal__content').css('width', 'min(84%, 473px)');
        $('body').css('overflow', 'hidden'); // スクロールを無効にする

        modal.addClass('show');
    }

    function closeModal() {
      modal.removeClass('show');

        modal.css('display', 'none');
        $('.js-modal-image>img').css({
          'aspect-ratio':'unset',
          'object-fit':'unset'
        });
        $('.modal__content').css('width', 'initial');
        $('body').css('overflow', 'auto'); // スクロールを有効に戻す
    }

  // =============================
  // footer リンク(information)
  // =============================
  $(document).ready(function() {
    // 現在のURLからクエリパラメータを抽出
    var urlParams = new URLSearchParams(window.location.search);

    // 'tab' キーに関連する値を取得
    var activeTab = urlParams.get("tab");

    // クエリパラメータ 'tab' が存在するかチェック
    if (activeTab) {
        // すべてのタブを非表示にし、アクティブなタブを表示
        $(".js-information-tab, .js-information-card").removeClass('current');
        $('[data-tab="' + activeTab + '"]').addClass('current');
    }
});

  // =============================
  // information タブ
  // =============================
  $('.js-information-tab').click(function() {
      let index = $('.js-information-tab').index(this);

      $('.js-information-tab').removeClass('current');
      $(this).addClass('current');
      $('.js-information-card').removeClass('current');
      $('.js-information-card').eq(index).addClass('current');
    });

});

  // =============================
  // フォームバリデーション
  // =============================
  $(document).ready(function() {
    $('.page-contact__error').hide();
    // 最初はエラーメッセージを非表示
    $('#js-form').validate({
      // フォームのバリデーションルールを設定
      rules: {
        name: {
          required: true,
        },
        mail_address: {
          required: true,
          email: true,
        },
        tel: {
          required: true,
        },
        inquiry: {
          required: true,
        },
        contents: {
          required: true,
        },
      },
      messages: {
        name: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください。',
        },
        mail_address: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください。',
        },
        tel: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください。',
        },
        inquiry: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください。',
        },
        contents: {
          required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください。',
        },
      },
      errorElement: "span",
      errorPlacement: function (error, element) {
        $('.page-contact__error-text').empty();
        // errorにエラーメッセージが格納されている
        // elementは対象となるinput要素
        error.appendTo($('.page-contact__error-text'));
        element.addClass('validation-error');
        $('.page-contact__error').show();
      },
    });
  });