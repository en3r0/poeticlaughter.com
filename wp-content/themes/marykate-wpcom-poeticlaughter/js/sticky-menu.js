/**
 * @author Chris Baldelomar
 * @website http://wordpresscanvas.com/
 */

( function( $ ) {
	"use strict";

	$( document ).ready(function() {
		function wpc_header_size() {
			var win_width, admin_bar_height, navbar_top_position, el_height, nav_height, navbar_parent, site_header;

			var win	            = $(window),
				admin_bar       = $('#wpadminbar'),
				navbar          = $('.nav-container'),
				site_header		= $('.site-header'),
				body            = $('body'),
				menu_toggle     = $('.menu-toggle'),
				sticky          = false,
				isMobile        = 'ontouchstart' in document.documentElement,
				navbar_top_postiion,
				calculate,
				set_height;

			if(!navbar.length) return false;

			if(isMobile) {
				return false;
			}

			navbar.wrap( "<div class='wpcsm-navbar-wrapper'></div>" );
			navbar_parent = navbar.parent();

			calculate = function() {
				navbar_top_position = navbar_parent.position().top;
				win_width = win.width();
				admin_bar_height = admin_bar.length ? admin_bar.outerHeight() : 0;
				el_height = Math.round(navbar_top_position - admin_bar_height);
				nav_height = navbar.outerHeight();
				// console.log("win_width:" + win_width + "px\nnavbar_top_position:" + navbar_top_position + "px\nel_height:" + el_height + "px\nnav_height:" + nav_height + "px\nadmin_bar_height:" + admin_bar_height + "px");
			};

			set_height = function() {
				var st = win.scrollTop();

				sticky = false;
				if ( menu_toggle.is(":hidden") ) {
					if ( win_width > 768 ) {
						if ( st > el_height ) {
							sticky = true;
						}
					}
				}

				if ( sticky ) {
					body.addClass('wpc-sticky-menu');
					navbar.css({'position':'fixed', 'top':admin_bar_height+'px', 'left':'0', 'right':'0', 'z-index':'1000', 'margin-left':'auto', 'margin-right':'auto'});
					navbar_parent.css('padding-bottom', (nav_height) + 'px');
				}
				else {
					body.removeClass('wpc-sticky-menu');
					navbar.css({'position':'', 'top':'', 'left':'', 'right':'', 'z-index':'', 'margin-left':'', 'margin-right':''});
					navbar_parent.css('padding-bottom', '');
				}
			};

			win.resize( function() {
				calculate();
				set_height();
			});

			calculate();
			set_height();

			win.scroll(set_height);

			if (site_header.length) {
				imagesLoaded( site_header, function() {
					calculate();
					set_height();
				});
			}

		}

		wpc_header_size();
	});

} )( jQuery );
