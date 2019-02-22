( function( $ ) {
    'use strict';

    var fontsArray = $.map(wpc2_fonts, function (value, key) { return { value: value, data: key }; });

	$( document ).ready(function() {
		$('.wpc2-fonts-autocomplete').each( function() {
			var $input = $(this);

			var options = {
				lookup: fontsArray,
				minChars: 0,
				zIndex: 999999,
				appendTo: $input.parent(),
				tabDisabled: true,
				onSelect: function (suggestion) {
					var $this = $(this);
					$this.keyup();
				}
			};
			
			// Initialize autocomplete with local lookup:
			$input.autocomplete(options);
		});
	});
} )( jQuery );
