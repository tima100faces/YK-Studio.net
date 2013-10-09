(function($) {
"use strict";

/* ======= CURRENT MENU ITEM ======= */

	var _height,
		pos,
		id_slide;

	$(document).scroll(function(){
		pos = $(this).scrollTop();
		$(".slide-menu").each(function() {
			id_slide = $(this).attr("id");
			_height = $(this).css("height");
			if($(this).offset().top <= pos + 100) {
				$("#main_menu .menu li").removeAttr("id");
				$("#main_menu .menu li").find("a[href^='#"+id_slide+"']").parent().attr("id","current_menu_item");	
			}
		});
	});

$(document).ready(function(){
	
		/* ======= CLEAR AJAX FORM ======= */
		
		if($("#form-ajax").is('*')) {
			$('#form-ajax')[0].reset();
		}
		
		/* ======= BACK TO TOP ======= */
		
				$(window).scroll(function () {
					if ($(this).scrollTop() > 700) {
						$('#backtop').css("opacity",1);
					} else {
						$('#backtop').css("opacity",0);
					}
				});

						// scroll body to 0px on click
				$('#backtop').click(function () {
					$('body,html').animate({
						scrollTop: 0
						}, 800);
						return false;
					});
	
		
		/* ======= SCROLL ITEMS ======= */

		$('.scrolling-links').localScroll({offset: {top: -65},duration: 1000});
		$('.home_bottom_arrow').localScroll();
		
		var hash = window.location.hash;
		$("html, body").scrollTo(hash, 1000, { offset: -65 });
				
		/* ======= FITVIDS ======= */
		
		$(".media-post").fitVids();
		
		/* ======= PARALLAX ======= */
		
		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it"s outerHeight option to determine when a section is in the viewport
		
		$(".home_parallax").parallax("100%", 0.1);
		$(".content_box_parallax").parallax("100%", 0.2);
		$(".bg").parallax("50%", 0.4);
		$(".team_parallax").parallax("50%", 0.3);
		$(".clients_parallax").parallax("50%", 0.3);
		$(".testimonials_parallax").parallax("50%", 0.3);
		$(".twitter_parallax").parallax("100%", 0.3);

		/* ======= STICKY MENU ======= */
		
		$("#main_menu").sticky({topSpacing:0});
		
		/* ======= BAR GRAPH ======= */
		
		$('.diagram').appear(function() {	
			$(".percent-layer").each(function() {
				var layer = jQuery(this).css("width");
				var parent = jQuery(this).parent().css("width");
				var percent = parseInt(layer,10)*100/parseInt(parent,10);
				$(this).css("width","0%");
				$(this).stop().animate( { width: percent+"%" }, { duration: 2500 } );
			});
		});
		
		/* ======= COUNTDOWN ======= */
		
		$('.countto').appear(function() {
			$(".number_container .number").each(function() {
				var count_element = $(this).html();
				$(this).countTo({
					from: 0,
					to: count_element,
					speed: 2500,
					refreshInterval: 50,
				});
			});
		});
		
		/* ======= CLIENT CAROUSEL ======= */
		
		$(".client-carousel").flexisel({
			visibleItems: 5
		});
		
		/* ======= ISOTOPE ======= */
		
		var $container = $('.portfolio-container');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			},
			layoutMode: 'fitRows',
		});
 
		$('.portfolio-categories ul li a').click(function(){
			$('.portfolio-categories ul li .current').removeClass('current');
			$(this).addClass('current');
	 
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				layoutMode: 'fitRows',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		}); 
		
		$(window).load(function() {
			$container.isotope('reLayout');
		});
		
		/* ======= RESPONSIVE SLIDES ======= */
		
		$(function() {
			$(".rslides-testimonials").responsiveSlides({
				nav: true,
				auto: false,
				prevText: "<i class='icon-angle-left'></i>",
				nextText: "<i class='icon-angle-right'></i>",
				navContainer: ".testimonials-navi"
			});
		});
		
		$(function() {
			$(".rslides-twitter").responsiveSlides({
				nav: true,
				auto: false,
				prevText: "<i class='icon-angle-left'></i>",
				nextText: "<i class='icon-angle-right'></i>",
				navContainer: ".navi-tweet"
			});
		});
		
		$(function() {
			$(".rslides-blog").responsiveSlides({
				nav: true,
				auto: true,
				prevText: "<i class='icon-angle-left'></i>",
				nextText: "<i class='icon-angle-right'></i>"
			});
		});
		
		
		
		/* ======= AJAX PORTFOLIO LOAD ======= */
		var toLoad;
		$('.portfolio-container a').click(function(){
			$('html, body').animate({scrollTop:$('#portfolio .title').position().top}, 'slow');
			toLoad = $(this).attr('href');　
			$('.close-button').delay(1000).show(500);
			$('.portfolio-view .row').hide('fast',loadContent);
			$('.ajax-portfolio-loader').slideDown(500);　
			function loadContent() {　
				$('.portfolio-view .row').load(toLoad,showNewContent());
		　　	}　
			function showNewContent() {
				$('.portfolio-view .row').show(500,hideLoader());
			}
			function hideLoader() {
				$('.ajax-portfolio-loader').slideUp(500);
			}
			return false;
		});
		
		$(".close-button").click(function() {
			$('.portfolio-view .row').html('');
			$(this).hide('fast');
			$('.ajax-portfolio-loader').slideUp(500);
		});
		
		/* ======= AJAX EMAIL CONTACT ======= */
		

		$('#form-ajax').submit(function(){	
			var errors = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var email_field = $("#email");
			var personal_field = $("#personal");
			
            if(!emailReg.test($.trim(email_field.val()))) {
				email_field.addClass("error-input");
				errors = true;
			}
			
			if(personal_field.val() === '') {
				personal_field.addClass("error-input");
				errors = true;
			}
			
			if(errors === false) {
				email_field.removeClass("error-input");
				personal_field.removeClass("error-input");
				var formInput = $(this).serialize();
					$.post($(this).attr('action'),formInput, function(data){
						$(".contact-success").remove();
						$(".contact-form").slideUp("fast");
						$(".contact-form").after('<div class="contact-success"><h4 class="contact-text">Thank you for your <span class="general_color">message</span>. We will try to answer as soon as possible.</h4></div>');
						$(".contact-success").fadeIn("slow");
				});
			}
			return false;
		});

		/* =============================== SHORTCODES =============================== */
		
		/* ======= SINGLE & MULTIPLE TOGGLES ======= */
		
		$(".toggle").click(function() {
			var parent = $(this).parent();
			var content = $(".toggle-content",this);
				if(parent.hasClass("single-toggles")) {
					$(".toggle-title-text",parent).addClass("hover-icon");
				}
				if(content.css("display") === "none") {
					if(parent.hasClass("single-toggles")) {
						$(".toggle-content",parent).slideUp(200);
						$(".toggle-arrow i",parent).removeClass("icon-angle-down");
						$(".toggle-arrow i",parent).addClass("icon-angle-right");
						$(".toggle-title-text",parent).addClass("hover-icon");
					}
					content.slideDown(200);
					$(".toggle-title-text",this).removeClass("hover-icon");
					$(".toggle-arrow i",this).removeClass("icon-angle-right");
					$(".toggle-arrow i",this).addClass("icon-angle-down");
				}
				else {
					content.slideUp(200);
					$(".toggle-title-text",this).addClass("hover-icon");
					$(".toggle-arrow i",this).removeClass("icon-angle-down");
					$(".toggle-arrow i",this).addClass("icon-angle-right");
				}
		});

		/* ======= TABS ======= */
		
		$('.tabs-menu').each(function() {
            var $ul = $(this);
            var $li = $ul.children('li');
            $li.each(function() { 
                var $trescTaba = $($(this).children('a').attr('href'));
                if ($(this).hasClass('active-tab')) {
                    $trescTaba.show();
                } else {
                    $trescTaba.hide();
                }
            });
            $li.click(function() {$(this).children('a').click();});
            $li.children('a').click(function() {
                $li.removeClass('active-tab');         
                $li.each(function() {
                    $($(this).children('a').attr('href')).hide();
                });
                $(this).parent().addClass('active-tab');
                $($(this).attr('href')).show();
                return false;
            });
        });
		
		/* ======= ALERTS ======= */
	
		$(".close-alert").click(function() {
			$(this).parent().hide(400);
		});
	
	
	
	});
})(jQuery);