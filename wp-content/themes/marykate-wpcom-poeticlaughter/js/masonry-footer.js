/**
 * Arranges footer widgets vertically.
 */

( function( $ ) {
    'use strict';

	if ( $.isFunction( $.fn.masonry ) ) {
		var gutter = parseInt( wpc2_footer['gutter'] );

		var $container = $('.masonry-sort');
		
		$container.masonry({
			itemSelector: '.widget',
			columnWidth: '.widget',
			gutter: gutter,
			transitionDuration: 0,
			isFitWidth: true
		});

		$container.css( 'visibility', 'visible' );

		$container.find('.widget').resize( function() {
			$container.masonry();
		});
	}
} )( jQuery );
