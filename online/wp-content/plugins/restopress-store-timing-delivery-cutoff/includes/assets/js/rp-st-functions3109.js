jQuery(function($) {

  // Get Cookie
  function rpress_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }

  $( document.body ).on('opened_service_options', function( event ) {

    //Remove the additional service date dropdown
    if ( rp_st_vars.enabled_sevice_type == 'delivery_and_pickup' ) {
      $('.delivery-settings-wrapper#nav-pickup .delivery-time-wrapper:eq(0)').remove();
    }

    //Selected service date
    var selectedDate = rpress_getCookie( 'service_date' );
    var selected = selectedDate !== '' ? selectedDate : rp_st_vars.selectedDate;

    $('.rpress_get_delivery_dates').val( $(".rpress_get_delivery_dates option:first").val() );

    if( selectedDate !== '' && $('.rpress_get_delivery_dates option[value="'+ selectedDate +'"]').length > 0 ) {
      $('.rpress_get_delivery_dates').change();
      $('.rpress_get_delivery_dates').val( selectedDate );
    }

  });

  $( 'body' ).on('change', '.rpress_get_delivery_dates', function() {
    var selectedDate = $(this).val();
    var serviceType = $(this).parents('.delivery-settings-wrapper').attr('id');
    $('.rpress_get_delivery_dates').val(selectedDate);
    $('.rpress-hrs').html('<option>' + rpress_scripts.loading +'...</option>');

    var selectedTime = rpress_getCookie( 'service_time' );

    var data = {
      action        : 'rp_st_render_timings',
      selectedDate  : selectedDate,
    };

    $.ajax({
      type      : "POST",
      data      : data,
      dataType  : "json",
      url       : rp_st_vars.ajaxurl,
      success: function( response ) {

        if( response.success ) {

          var currentDate = rp_st_vars.current_date;
          var pickupHrs = response.data.pickupHrs;
          var deliveryHrs = response.data.deliveryHrs;

          var pickupHtml = $('<select>');
          var deliveryHtml = $('<select>');

          if( pickupHrs !== null ) {
            for ( i = 0; i < pickupHrs.length; i++ ) {
              pickupHtml.append( $('<option></option>').val(pickupHrs[i]).html(pickupHrs[i]) );
            }
            $('.rpress-pickup-time-wrap select#rpress-pickup-hours').find('option').remove().end().append(pickupHtml.html());
            $('.rpress-pickup-time-wrap select#rpress-pickup-hours').val($(".rpress-pickup-time-wrap select#rpress-pickup-hours option:first").val());
            if( selectedTime !== undefined &&  $('select#rpress-pickup-hours option[value="'+ selectedTime +'"]').length > 0 )
              $('.rpress-pickup-time-wrap select#rpress-pickup-hours').val(selectedTime);
          }

          if( deliveryHrs !== null  ) {
            for ( k = 0; k < deliveryHrs.length; k++ ) {
              deliveryHtml.append( $('<option></option>').val(deliveryHrs[k]).html(deliveryHrs[k]) );
            }
            $('.rpress-delivery-time-wrap select#rpress-delivery-hours').find('option').remove().end().append(deliveryHtml.html());
            $('.rpress-delivery-time-wrap select#rpress-delivery-hours').val($(".rpress-delivery-time-wrap select#rpress-delivery-hours option:first").val());
            if( selectedTime !== undefined &&  $('select#rpress-delivery-hours option[value="'+ selectedTime +'"]').length > 0 )
              $('.rpress-delivery-time-wrap select#rpress-delivery-hours').val(selectedTime);
          }
        }
      }
    });
  });
});
