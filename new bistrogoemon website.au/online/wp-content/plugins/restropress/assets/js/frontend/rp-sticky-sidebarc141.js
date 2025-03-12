jQuery(function($){

  if ($(window).width() > 991) {
    var totalHeight = $('header:eq(0)').length > 0 ? $('header:eq(0)').height() + 30 : 120;
    if ($(".sticky-sidebar").length > 0 ) {
      $('.sticky-sidebar').rpressStickySidebar({
        additionalMarginTop: totalHeight
      });
    }
  }
  else {
    var totalHeight = $('header:eq(0)').length > 0 ? $('header:eq(0)').height() + 30 : 70;
  }

  //Category navigation
  $('body').on('click', '.rpress-category-link', function(e) {
    e.preventDefault();
    var this_id = $(this).data('id');
    var gotom = setInterval(function () {
        rpress_go_to_navtab(this_id);
        clearInterval( gotom );
    }, 100);
  });

  function rpress_go_to_navtab(id) {
    var scrolling_div = jQuery('div.rpress_fooditems_list').find('div#menu-category-'+id);
    if( scrolling_div.length ) {
      offSet = scrolling_div.offset().top;

      var body = jQuery( "html, body" );

      body.animate({
        scrollTop: offSet - totalHeight
      }, 500);

    }
  }
  $('.rpress-category-item').on('click', function(){
      $('.rpress-category-item').removeClass('current');
      $(this).addClass('current');
  });
});
