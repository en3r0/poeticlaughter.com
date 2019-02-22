/**
 * @author Chris Baldelomar
 * @website http://webplantmedia.com/
 */


( function( $ ) {
	"use strict";

	var body = $( 'body' ),
		_window = $( window );

	var calculateGrid = function($container) {
		var columns = parseInt( $container.data('columns') );
		var gutterWidth = $container.data('gutterWidth');
		var containerWidth = $container.width();

		if ( isNaN( gutterWidth ) ) {
			gutterWidth = 5;
		}
		else if ( gutterWidth > 30 || gutterWidth < 0 ) {
			gutterWidth = 5;
		}

		if ( columns > 1 ) {
			if ( containerWidth < 568 ) {
				columns -= 2;
				if ( columns > 4 ) {
					columns = 4;
				}
			}
			/* else if ( containerWidth < 768 ) { 
				columns -= 1;
			} */

			if ( columns < 2 ) {
				columns = 2;
			}
		}

		gutterWidth = parseInt( gutterWidth );

		var allGutters = gutterWidth * ( columns - 1 );
		var contentWidth = containerWidth - allGutters;

		var columnWidth = Math.floor( contentWidth / columns );

		return {columnWidth: columnWidth, gutterWidth: gutterWidth, columns: columns};
	}

	var runMasonry = function( duration, $container) {
		var $postBox = $container.children('.gallery-item');

		var o = calculateGrid($container);

		$postBox.css({'width':o.columnWidth+'px', 'margin-bottom':o.gutterWidth+'px', 'padding':'0'});

		$container.masonry( {
			itemSelector: '.gallery-item',
			columnWidth: o.columnWidth,
			gutter: o.gutterWidth,
			transitionDuration: duration 
		} );
	}


	var masonryGallery = function() {
		$('.gallery.wpc2-thumbnail-grid').each( function() {
			var $container = $(this);

			if ( $container.is(':hidden') ) {
				return;
			}

			if ( $container.hasClass( 'masonry' ) ) {
				return;
			}

			imagesLoaded( $container, function() {
				runMasonry(0, $container);

				$container.css('visibility', 'visible');
			});

			$(window).resize(function() {
				runMasonry(0, $container);
			});
		});
	};

	$(document).ready( masonryGallery );

	// Triggers re-layout on infinite scroll
	$( document.body ).on( 'post-load', function () {
		masonryGallery();
	}); 

	// Triggers re-layout on accordion, tabs, toggle
	$( document.body ).on( 'wcs-toggled', function () {
		masonryGallery();
	}); 


} )( jQuery );
