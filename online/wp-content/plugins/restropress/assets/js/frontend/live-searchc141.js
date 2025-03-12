jQuery(function($) {
  jQuery( '.rpress_fooditems_list' ).find( '.rpress-title-holder a' ).each(function(){
    jQuery(this).attr('data-search-term', jQuery(this).text().toLowerCase());
  });

  jQuery( '#rpress-food-search' ).on('keyup', function(){
    var searchTerm = jQuery(this).val().toLowerCase();
    var DataId;
    var SelectedTermId;
    
    jQuery( '.rpress_fooditems_list' ).find('.rpress-element-title').each(function(index, elem) {
      jQuery(this).removeClass('not-matched');
      jQuery(this).removeClass('matched');
    });

    jQuery('.rpress_fooditems_list').find('.rpress-title-holder a').each(function(){
      DataId = jQuery(this).parents('.rpress_fooditem').attr('data-term-id');
      
      if ( jQuery(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1 ) {
        jQuery(this).parents('.rpress_fooditem').show();
        jQuery('.rpress_fooditems_list').find('.rpress-element-title').each(function(index, elem) {
          if( jQuery(this).attr('data-term-id') == DataId ) {
            jQuery(this).addClass('matched');
          }
          else {
            jQuery(this).addClass('not-matched');
          }
        });
      }
      else {
        jQuery(this).parents('.rpress_fooditem').hide();
        jQuery('.rpress_fooditems_list').find('.rpress-element-title').each(function(index, elem) {
          jQuery(this).addClass('not-matched');
        });
      }
    });
  });
})