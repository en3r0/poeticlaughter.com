/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function( $ ) {
    'use strict';

	var container, button, menu;

	container = document.getElementById( 'site-navigation' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'h1' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += ' nav-menu';

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) )
			container.className = container.className.replace( ' toggled', '' );
		else
			container.className += ' toggled';
	};

	var testResponsiveness = function() {
		var $button, $container;

		$button = $(button);
		$container = $(container);

		if ( $button.is(":visible") ) {
			$container.addClass('responsive-menu');
		}
		else {
			$container.removeClass('responsive-menu');
		}
	};

	$(window).resize( testResponsiveness );
	testResponsiveness();

	// Prevent action of dropdowns with href="#"
	$(container).find( 'a[href="#"]' ).click( function( event ) {
		event.preventDefault();
		return false;
	});

} )( jQuery );
