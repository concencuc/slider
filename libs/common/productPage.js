
//-------------------------------------------------------//
//Product page
//-------------------------------------------------------//

function initProduct(opt) {
	//init spriteSpin
	$(opt.cube).spritespin({
		source: SpriteSpin.sourceArray(opt.cubeFoto, { frame: [1,36], digits: 2 }),
		width: 600,
		height: 600,
		sense: -1,
		animate: false,
		loop: false,
		wrap: false,
		plugins: ['360'],
	});
	var apiSpritespin = $(opt.cube).spritespin("api");

	//init scroll func
	var slides = opt.slides;
	var windowH = window.innerHeight || document.body.clientHeigh;
	var scrollPrev = window.pageYOffset;

	var startAnimate = $('#product').offset().top - windowH / 2;
	var stopAnimate = $($(slides)[$(slides).length - 1]).offset().top + $($(slides)[$(slides).length - 1]).height();
	
	startAnimateCube.step = startAnimate;
	startAnimateCube.pos = 0;

	$(window).on('scroll', function(e) {
		var scrollPos = this.pageYOffset;
		if(scrollPos > startAnimate && scrollPos + windowH < stopAnimate) {
			startAnimateCube(scrollPrev,scrollPos,apiSpritespin,opt.slides,windowH);
		}

		//fix cube
		if(scrollPos >= $('#product').offset().top) $('.cube-animation-wrap').addClass('cube-animation-wrap-fixed');

		//remove fix cube
		if(scrollPos <= $('#product').offset().top) {
			$('.cube-animation-wrap').removeClass('cube-animation-wrap-fixed');
			$('.cube-animation-wrap').removeClass('cube-animation-wrap-bottom');
		}

		//cube bottom
		if(scrollPos + windowH >= stopAnimate + 280) {
			$('.cube-animation-wrap').removeClass('cube-animation-wrap-fixed');
			$('.cube-animation-wrap').addClass('cube-animation-wrap-bottom');
		}


		scrollPrev = scrollPos;
	}) //end scroll func
	
}


//main func to animate cube and slides
function startAnimateCube(scrollPrev,scrollPos,apiSpritespin,slides,windowH) {
	var delta = scrollPos - scrollPrev;
	if(delta > 0){
		//scroll down
		opacitySlidesNext(scrollPos,slides,windowH);
		moveCubeNext(scrollPos,slides,windowH);
		imageCubeNext(scrollPos,apiSpritespin);
	}
	else {
		//scroll up
		opacitySlidesPrev(scrollPos,slides,windowH);
		moveCubePrev(scrollPos,slides,windowH);
		imageCubePrev(scrollPos,apiSpritespin);
	}
} //end func




//change image cube next
function imageCubeNext(scrollPos,apiSpritespin) {
	if(scrollPos > startAnimateCube.step) {
		apiSpritespin.nextFrame();
		startAnimateCube.step += 100;
	}
} //end func


//change opacity cube slides next
function opacitySlidesNext(scrollPos,slides,windowH) {
	var activeSlide = $(slides).map(function() {
		if(scrollPos + windowH >= $(this).offset().top) return this
	})

	if(scrollPos > startAnimateCube.step) {
		var curEl = $(activeSlide[activeSlide.length - 1]);
		var prevEl = $(slides)[activeSlide.length - 2];

		if($(curEl).css('opacity') >= 1) {
			$(curEl).css('opacity', '1')
		}
		else {
			var curO = Number($(curEl).css('opacity'));
			curO += 0.2;
			$(curEl).css('opacity', curO);
		}

		if(prevEl != undefined) {
			if($(prevEl).css('opacity') <= 0) {
				$(prevEl).css('opacity', '0');
			}
			else {
				var prevO = Number($(prevEl).css('opacity'));
				prevO -= 0.2;
				$(prevEl).css('opacity', prevO);
			}
		}
	}

} //end func


//move position cube next
function moveCubeNext(scrollPos,slides,windowH) {
	var activeSlide = $(slides).map(function() {
		if(scrollPos + windowH >= $(this).offset().top - 300) return this
	})

	//move left
	if(activeSlide.length == 3) {
		if(scrollPos > startAnimateCube.step) {
			if(startAnimateCube.pos <= -100) {
				$('.cube-animation-wrap').css('transform', 'translateX(-100%)');
				startAnimateCube.pos = -100;
			}
			else {
				startAnimateCube.pos -= 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}		
		}
	}

	//move center
	if(activeSlide.length == 5) {
		if(scrollPos > startAnimateCube.step) {
			if(startAnimateCube.pos >= -50) {
				$('.cube-animation-wrap').css('transform', 'translateX(-50%)');
				startAnimateCube.pos = -50;
			}
			else {
				startAnimateCube.pos += 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}	
		}
	}

	//move right
	if(activeSlide.length == 7) {
		if(scrollPos > startAnimateCube.step) {
			if(startAnimateCube.pos >= 0) {
				$('.cube-animation-wrap').css('transform', 'translateX(0%)');
				startAnimateCube.pos = 0;
			}
			else {
				startAnimateCube.pos += 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}		
		}
	}

} //end func


//change image cube prev
function imageCubePrev(scrollPos,apiSpritespin) {
	if(scrollPos < startAnimateCube.step) {
		apiSpritespin.prevFrame();
		startAnimateCube.step -= 100;
	}
} //end func


//change opacity cube slides prev
function opacitySlidesPrev(scrollPos,slides,windowH) {
	var activeSlide = $(slides).map(function() {
		if(scrollPos + windowH <= $(this).offset().top + $(this).height()) return this
	})

	if(scrollPos < startAnimateCube.step) {
		var prevEl = $(slides)[$(slides).length - activeSlide.length - 1];
		var curEl = $(activeSlide)[0];

		//if($(curEl).css('opacity') < 0) $(curEl).css('opacity', '0')
		//else $(curEl).animate({opacity: '-=0.2'}, 'fast');
		if($(curEl).css('opacity') <= 0) {
			$(curEl).css('opacity', '0');
		}
		else {
			var curO = Number($(curEl).css('opacity'));
			curO -= 0.2;
			$(curEl).css('opacity', curO);			
		}

		if(prevEl != undefined) {
			//if($(prevEl).css('opacity') > 1) $(prevEl).css('opacity', '1')
			//else $(prevEl).animate({opacity: '+=0.2'}, 'fast');
			if($(prevEl).css('opacity') >= 1) {
				$(prevEl).css('opacity', '1');
			}
			else {
				var prevO = Number($(prevEl).css('opacity'));
				prevO += 0.2;
				$(prevEl).css('opacity', prevO);				
			}
		}
	}	

} //end func


//move position cube prev
function moveCubePrev(scrollPos,slides,windowH) {
	var activeSlide = $(slides).map(function() {
		if(scrollPos + windowH <= $(this).offset().top + $(this).height() + 200) return this
	})

	//move center
	if(activeSlide.length == 1) {
		if(scrollPos < startAnimateCube.step) {
			if(startAnimateCube.pos <= -50) {
				$('.cube-animation-wrap').css('transform', 'translateX(-50%)');
				startAnimateCube.pos = -50;
			}
			else {
				startAnimateCube.pos -= 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}		
		}
	}

	//move left
	if(activeSlide.length == 3) {
		if(scrollPos < startAnimateCube.step) {
			if(startAnimateCube.pos >= -100) {
				$('.cube-animation-wrap').css('transform', 'translateX(-100%)');
				startAnimateCube.pos = -100;
			}
			else {
				startAnimateCube.pos -= 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}	
		}
	}

	//move right
	if(activeSlide.length == 5) {
		if(scrollPos < startAnimateCube.step) {
			if(startAnimateCube.pos >= 0) {
				$('.cube-animation-wrap').css('transform', 'translateX(0%)');
				startAnimateCube.pos = 0;
			}
			else {
				startAnimateCube.pos += 10;
				$('.cube-animation-wrap').css('transform', 'translateX(' + startAnimateCube.pos + '%)');
			}		
		}
	}

} //end func



//-------------------------------------------------------//
//END Product page
//-------------------------------------------------------//