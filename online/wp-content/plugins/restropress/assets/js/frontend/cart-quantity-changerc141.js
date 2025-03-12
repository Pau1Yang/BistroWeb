jQuery(function($) {
  //quantity Minus
  var liveQtyVal;

  jQuery( document ).on('click', '.qtyminus', function(e) {
    // Stop acting like a button
    e.preventDefault();

    // Get the field name
    fieldName = 'quantity';

    // Get its current value
    var currentVal = parseInt( jQuery('input[name='+fieldName+']').val() );

    // If it isn't undefined or its greater than 0
    if ( !isNaN(currentVal) && currentVal > 1 ) {

    // Decrement one only if value is > 1
      jQuery('input[name='+fieldName+']').val(currentVal - 1);
      jQuery('.qtyplus').removeAttr('style');
      liveQtyVal = currentVal - 1;
    }
    else {
      // Otherwise put a 0 there
      jQuery('input[name='+fieldName+']').val(1);
      jQuery('.qtyminus').css('color','#aaa').css('cursor','not-allowed');
      liveQtyVal = 1;
    }
    jQuery(this).parents('div.modal-footer').find('a.submit-fooditem-button').attr('data-item-qty', liveQtyVal);
    jQuery(this).parents('div.modal-footer').find('a.submit-fooditem-button').attr('data-item-qty', liveQtyVal);

  });

  jQuery(document).on('click', '.qtyplus', function(e) {
    // Stop acting like a button
    e.preventDefault();

    // Get the field name
    fieldName = 'quantity';
    // Get its current value
    var currentVal = parseInt(jQuery('input[name='+fieldName+']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      jQuery('input[name='+fieldName+']').val(currentVal + 1);
      jQuery('.qtyminus').removeAttr('style');
      liveQtyVal = currentVal + 1;
    } else {
      // Otherwise put a 0 there
      jQuery('input[name='+fieldName+']').val(1);
      liveQtyVal = 1;
    }
    jQuery(this).parents('div.modal-footer').find('a.submit-fooditem-button').attr('data-item-qty', liveQtyVal);
    jQuery(this).parents('div.modal-footer').find('a.submit-fooditem-button').attr('data-item-qty', liveQtyVal);

  });
});