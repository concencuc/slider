
function initMethodPage() {
	var windowH = window.innerHeight || document.body.clientHeigh;
	// animateMmenu();
	var titleEl = $('#section-method-title');

	//elements for parallax
	var titleElH = $(titleEl).height();
	var titleImg = $(titleEl).find('img');

	//graph
	var initGraphAnimate = animateGraph();

	//ionosphere
	// var initIonosphereAnimate = animateIonosphere();


	
	$(window).scroll(function() {
		var scrollPos = $(this).scrollTop();

		//parallax title img
		if(scrollPos < titleElH) $(titleImg).css('transform', 'translateY(' + scrollPos/20 + '%');

		if(scrollPos + windowH > $('#section-theory3').offset().top - 200) {
			$('#section-theory2 img').addClass('fadeIn-ellips');
		}

		// if(scrollPos + windowH > $('#section-theory1 .img-wrap').offset().top + 300) {
		// 	initIonosphereAnimate();
		// }

		if(scrollPos + windowH > $('#section-photogallery').offset().top) {
			initGraphAnimate();
		}

		
	})
	

}


//animate ionosphere
function animateIonosphere() {
	var start = true;
	var ionosphereAnimation =  new LazyLinePainter(ionosphere);
	return function() {
		if(start) ionosphereAnimation.paint();
		start = false;
	}
}




//animate graph
function animateGraph() {
	var start = true;
	var graphAnimation = new LazyLinePainter(graph);
	graphAnimation.on('complete', function() {
		$('.left-signatures').fadeIn('fast');
		$('.center-signatures').fadeIn('fast');
		$('.right-signatures').fadeIn('fast', function() {
			$('.vertical-line').addClass('vertical-line-animate');
			$('.vertical-line img').addClass('arrow-animate');
			$('.vertical-line h4').fadeIn('fast', function() {
				$('.clock-line img').fadeIn();
				$('.clock-line').addClass('clock-line-animate');
				animateSection(['#section-theory3 a']);
			});
		})
	})
	return function() {
		if(start) graphAnimation.paint();
		start = false;
	}
}