(function ($) {
    "use strict";
////////////////////////////////////////////////////////////////////////
// 01. Screen Width
var device_width = window.screen.width;


// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "991"
});

//mobile side menu
$('.side-toggle').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
});


// $(window).on('scroll', function () {
// 	var scroll = $(window).scrollTop();
// 	if (scroll < 120) {
// 		$(".header-sticky").removeClass("sticky");
// 	} else {
// 		$(".header-sticky").addClass("sticky");
// 	}
// });

// other-feature active 
const otherFeatureActive = new Swiper(".other-feature-active", {
	slidesPerView: 1,
	spaceBetween: 25,
	loop: true,
	speed: 3000,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,

	autoplay: {
		delay: 1,
	},
	breakpoints: {
		0: {
			slidesPerView: 2,
			},
		576: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 10
		}
	}
});

// other-feature active two 
const otherFeatureActiveTwo = new Swiper(".other-feature-active_Two", {
	slidesPerView: 1,
	spaceBetween: 25,
	loop: true,
	speed: 3000,
	rtl: true,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,

	autoplay: {
		delay: 1,
		reverseDirection:true,
	},
	breakpoints: {
		0: {
			slidesPerView: 2,
			},
		576: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 10
		}
	}
});

// other-feature three 
const otherFeatureActiveThree = new Swiper(".other-feature-active_Three", {
	slidesPerView: 1,
	spaceBetween: 25,
	loop: true,
	speed: 3000,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,

	autoplay: {
		delay: 1,
	},
	breakpoints: {
		0: {
			slidesPerView: 2,
			},
		576: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 10
		}
	}
});


// other-text three 
const otherTextActive = new Swiper(".other-text-active", {
	slidesPerView: 1,
	spaceBetween: 50,
	loop: true,
	speed: 10000,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,
	autoplay: {
		delay: 1,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		992: {
			slidesPerView: 1,
		},
		1200: {
			slidesPerView: 1
		}
	}
});



// inner page active 
const innerPageActive = new Swiper(".inner_page-active-1", {
	slidesPerView: 1,
	spaceBetween: 25,
	loop: true,
	speed: 5000,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,

	autoplay: {
		delay: 1,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		}
	}
    
});


// inner page active 
const innerPageActiveTwo = new Swiper(".inner_page-active-2", {
	slidesPerView: 1,
	spaceBetween: 25,
	loop: true,
	speed: 5000,
	rtl: true,
	freeMode: true,
	allowTouchMove: false,
	disableOnInteraction: true,
	preventInteractionOnTransition:true,

	autoplay: {
		delay: 1,
		reverseDirection:true,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		}
	}
});

// data background
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

// Nice Select Js 
$('.has-nice-select, select').niceSelect();

// Magic mouser cursor 
var myCursor = $('.rts-cursor');
if (myCursor.length) {
	if ($("body").length) {
	const e = document.querySelector(".cursor-inner"),
		t = document.querySelector(".cursor-outer");
	var n, i = 0,
		W = 0,
		intro = 0,
		o = !1;
	// if($('.xoxo_fn_intro').length){intro=1;}
	var buttons = "a, button, .active-progress, .search-click, .action-menu, .swiper-button-next, .swiper-button-prev";
	var remove_cursor = ".learn-more-btn, .swiper-slider-main-main-wrapper-portfolio .thumbnail, .single-portfolio-style-five a, .mySwiper_portfolio-5-scale-none a";
	// link mouse enter + move
	window.onmousemove = function (s) {
		o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
	}, $("body").on("mouseenter", buttons, function () {
		e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
	}), $("body").on("mouseleave", buttons, function () {
		$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
	}), e.style.visibility = "visible", t.style.visibility = "visible";
	// slider mouse enter
	var mightyBody = jQuery('body');
	mightyBody.on('mouseenter', remove_cursor, function () {
		e.classList.add('cursor-remove');
		t.classList.add('cursor-remove');
	}).on('mouseleave', remove_cursor, function () {
		e.classList.remove('cursor-remove');
		t.classList.remove('cursor-remove');
	});
	}
}

// 04. Active GSAP
  if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
    const smoother = ScrollSmoother.create({
      smooth: 1.35,
      effects: device_width < 1025 ? false : true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
}

// Title Animation Slideup
let splitTitleLines = gsap.utils.toArray(".tp_title_slideup");

splitTitleLines.forEach(splitTextLine => {
    const titleLine = gsap.timeline({
    scrollTrigger: {
        trigger: splitTextLine,
        start: 'top 100%',
        end: 'bottom 50%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none none'
    }
    });

    const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
    gsap.set(splitTextLine, { perspective: 400 });
    itemSplitted.split({ type: "lines" })
    titleLine.from(itemSplitted.lines, { duration: 1, delay: 0.1, opacity: 0, rotationX: -50, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
});

////////////////////////////////////////////////////////////////////////////////
// 05. Section Heading Animation

let headingTimeline = gsap.timeline()

let subTitleContainer = new SplitText(".tp_subtitle_anim", { type: "chars" });
let subTitleChar = subTitleContainer.chars 
headingTimeline.from(subTitleChar, {
  x: 20,
  ease: "back.out",
  opacity: 0,
  duration: 1,
  stagger: 0.1
});

let TitleContainer = new SplitText(".tp_title_anim", { type: "chars, words" });
let TitleChar = TitleContainer.words 
headingTimeline.from(TitleChar, {
    x: 100,
    y: 0,
    z: -200,
    autoAlpha: 0,
    duration: 2,
    stagger: 0.2
},"-=2");

let descriptionContainer = new SplitText(".tp_desc_anim", { type: "chars, words" });
let descriptionChar = descriptionContainer.words 
headingTimeline.from(descriptionChar, {
    x: 50,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.05
},"-=2"); 


/////////////////////////////////////////////////////
// SlideUp Slider Animation | tp_fade_bottom

gsap.set(".tp_fade_bottom", { y: 50, opacity: 0 });

const fadeArray = gsap.utils.toArray(".tp_fade_bottom")
    fadeArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
        scrollTrigger: {
        trigger: item,
        start: "top center+=300",
        }
    })
    fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
    })
})

// SlideUp Slider Animation footer | tp_fade_bottom_footer

gsap.set(".tp_fade_bottom_footer", { y: 50, opacity: 0 });

const footerFadeArray = gsap.utils.toArray(".tp_fade_bottom_footer")
footerFadeArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
        scrollTrigger: {
        trigger: item,
        start: "top 100%",
        }
    })
    fadeTl.to(item, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
    })
})


// SlideLeft Slider Animation | tp_fade_left
gsap.set(".tp_fade_left", { x: 30, opacity: 0 });

const fadeleftArray = gsap.utils.toArray(".tp_fade_left")
fadeleftArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
        scrollTrigger: {
        trigger: item,
        start: "top center+=300",
        }
    })
    fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
    })
})


// SlideLeft Slider Animation | tp_fade_right
gsap.set(".tp_fade_right", { x: -30, opacity: 0 });

const fadeRightArray = gsap.utils.toArray(".tp_fade_right")
fadeRightArray.forEach((item, i) => {
    let fadeTl = gsap.timeline({
        scrollTrigger: {
        trigger: item,
        start: "top center+=300",
        }
    })
    fadeTl.to(item, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
    })
})



// product quantity
var productQuantity = 1;

// quantity form 
$('.shop_details-action-box .plus').on('click', function () {
	var selectedInput = $(this).closest('.shop_details-action-box').find('input');
	productQuantity += 1;
	selectedInput.attr('value', productQuantity);
});
$('.shop_details-action-box .minus').on('click', function () {
	var selectedInput = $(this).closest('.shop_details-action-box').find('input');
	productQuantity-=1;
	if(productQuantity < 1) {
		productQuantity = 1;
	}
	selectedInput.attr('value', productQuantity);
});



// heading Text Reveal Animation 

const anim_reveal = document.querySelectorAll(".tp_has_text_reveal_anim");

anim_reveal.forEach(areveal => {

    var duration_value = 1.5
    var onscroll_value = 1
    var stagger_value = 0.02
    var data_delay = 0.05

    if (areveal.getAttribute("data-duration")) {
        duration_value = areveal.getAttribute("data-duration");
    }
    if (areveal.getAttribute("data-on-scroll")) {
        onscroll_value = areveal.getAttribute("data-on-scroll");
    }
    if (areveal.getAttribute("data-stagger")) {
        stagger_value = areveal.getAttribute("data-stagger");
    }
    if (areveal.getAttribute("data-delay")) {
        data_delay = areveal.getAttribute("data-delay");
    }



    areveal.split = new SplitText(areveal, {
        type: "lines,words,chars",
        linesClass: "anim-reveal-line"
    });

    if (onscroll_value == 1) {
        areveal.anim = gsap.from(areveal.split.chars, {
            scrollTrigger: {
                trigger: areveal,
                start: 'top 85%',
            },
            duration: duration_value,
            delay: data_delay,
            ease: "circ.out",
            y: 80,
            stagger: stagger_value,
            opacity: 0,
        });
    } else {
        areveal.anim = gsap.from(areveal.split.chars, {
            duration: duration_value,
            delay: data_delay,
            ease: "circ.out",
            y: 80,
            stagger: stagger_value,
            opacity: 0,
        });
    }

});


// common Fade Animation 

const dfadeArray = gsap.utils.toArray(".tp_has_fade_anim")
// gsap.set(dfadeArray, {opacity:0})
dfadeArray.forEach((item, i) => {

    var fade_direction = "bottom"
    var onscroll_value = 1
    var duration_value = 1.5
    var fade_offset = 50
    var delay_value = 0.5
    var ease_value = "power2.out"

    if (item.getAttribute("data-fade-offset")) {
        fade_offset = item.getAttribute("data-fade-offset");
    }
    if (item.getAttribute("data-duration")) {
        duration_value = item.getAttribute("data-duration");
    }

    if (item.getAttribute("data-fade-from")) {
        fade_direction = item.getAttribute("data-fade-from");
    }
    if (item.getAttribute("data-on-scroll")) {
        onscroll_value = item.getAttribute("data-on-scroll");
    }
    if (item.getAttribute("data-delay")) {
        delay_value = item.getAttribute("data-delay");
    }
    if (item.getAttribute("data-ease")) {
        ease_value = item.getAttribute("data-ease");
    }

    if (onscroll_value == 1) {
        if (fade_direction == "top") {
            gsap.from(item, {
                y: -fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            })
        }
        if (fade_direction == "left") {
            gsap.from(item, {
                x: -fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            })
        }
        if (fade_direction == "bottom") {
            gsap.from(item, {
                y: fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            })
        }
        if (fade_direction == "right") {
            gsap.from(item, {
                x: fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            })
        }
        if (fade_direction == "in") {
            gsap.from(item, {
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            })
        }
    }
    else {
        if (fade_direction == "top") {
            gsap.from(item, {
                y: -fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            })
        }
        if (fade_direction == "left") {
            gsap.from(item, {
                x: -fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            })
        }
        if (fade_direction == "bottom") {
            gsap.from(item, {
                y: fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            })
        }
        if (fade_direction == "right") {
            gsap.from(item, {
                x: fade_offset,
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            })
        }
        if (fade_direction == "in") {
            gsap.from(item, {
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            })
        }
    }
})

	// price animation 
	let price_fade_items = gsap.utils.toArray(".tp_choose_fade_anim")
	if (device_width < 1023) {
		price_fade_items.forEach((item, i) => {
			gsap.set(item, { opacity: 0, y: 50 })
			let featured2Timeline = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%"
				}
			})
			featured2Timeline.to(item, {
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: "power2.out",
				delay: 0.3,
			}, "+=0.3")
		})
	}
	else {
		gsap.set(".tp_choose_fade_anim", { opacity: 0, y: 50 })
		gsap.to(".tp_choose_fade_anim", {
			scrollTrigger: {
				trigger: ".tp_choose_fade_anim",
				start: "top 90%"
			},
			opacity: 1,
			y: 0,
			duration: 1.5,
			ease: "power2.out",
			stagger: 0.2,
			delay: 0.3,
		}, "+=0.3")
	}

    // smooth nav tab 
	$.scrollIt({
		upKey: 38,     
		downKey: 40,
		easing: 'swing',
		scrollTime: 600,
		activeClass: 'active',
		onPageChange: null,
		topOffset: 0
	});


})(jQuery);