//-------------------------------------------------------//
//Main page
//-------------------------------------------------------//

function initMainPage(){
	//menu opt
	// var menuEl = $('#mMenu');
	// var curPosMenu = Number($(menuEl).css('top').match(/[0-9]+/g)[0]); //find pos menu
	// var menuH = $(menuEl).height();
	// animateMmenu();
	var windowH = window.innerHeight || document.body.clientHeigh;

	//tree opt
	var tree = document.querySelector('#tree');
	animateTree.start = true;


	//benefits func
	setPosCubePlanets();
	setPosPlanetText();
	animatePlanets();


	//brain opt
	var brain = document.querySelector('#brain');
	var startAnimateBrain = animateBrain();


	//press owlCarousel
	var pressOwl = $('.press-owl-carousel').owlCarousel({
		loop: false,
		items: 3,
		nav: false,
		dots: false,
		margin: 0,
	});
	$('.pressNavLeft').click(function() {pressOwl.trigger('prev.owl.carousel')});
	$('.pressNavRight').click(function() {pressOwl.trigger('next.owl.carousel')});


	//blog owlCarousel
	var blogOwl = $('.blog-carousel-wrap').owlCarousel({
		loop: false,
		items: 3,
		nav: false,
		dots: false,
		margin: 0,
	})
	$('.blogNavLeft').click(function() {blogOwl.trigger('prev.owl.carousel')});
	$('.blogNavRight').click(function() {blogOwl.trigger('next.owl.carousel')});


	//emergence elements on mainSection
	// $(menuEl).addClass('emergence-top-down');
	$("#section-title h1").addClass('emergence-title');
	$("#section-title p").addClass('emergence-left-right');
	$("#section-title a").addClass('emergence-left-right');


	//scroll func
	$(window).on('scroll', function(e) {
		var scrollPos = this.pageYOffset;

		// //change menu style
		// if(scrollPos > menuH + curPosMenu) {
		// 	$(menuEl).addClass('header-fixed');
		// }
		// else if(scrollPos){
		// 	$(menuEl).removeClass('header-fixed');
		// }

		//animate tree
		if(scrollPos + windowH > $(tree).offset().top) {
			if(animateTree.start) {
				setPosTextCircles();
				animateTree();
			}
		} //end animate

		//animate brain
		if(scrollPos + windowH + 100 > $(brain).offset().top) {
			startAnimateBrain();
		}

		//animate sections
		if(scrollPos + windowH > $('#section-ecosleepCube .text-content').offset().top + 200) {
			$('#section-ecosleepCube .women-with-cube').addClass('animateImg');
			animateSection(['#section-ecosleepCube .text-content', '#section-ecosleepCube a']);
		}

		if(scrollPos + windowH > $('#section-benefits').offset().top + 400) {
			animateSection(['#section-benefits .nav-wrap']);
			$('#section-benefits .orbit').css('opacity', '1');
			$('#section-benefits .planet-text-wrap').css('opacity', '1')
		}

		if(scrollPos + windowH > $('#section-science .science-info-wrap').offset().top + 100) {
			animateSection(['#section-science p', '#section-science a']);
		}

		if(scrollPos + windowH > $('#section-aboutUs .aboutUs-info-wrap').offset().top + 100) {
			animateSection(['#section-aboutUs p', '#section-aboutUs a']);
		}

		if(scrollPos + windowH > $('#section-press .press-info-wrap').offset().top + 100) {
			animateSection(['#section-press .press']);
		}

		if(scrollPos + windowH > $('#section-offer .offer-info-wrap').offset().top + 100) {
			animateSection(['#section-offer h3', '#section-offer .btn']);
		}

		if(scrollPos + windowH > $('#section-blog .blog-carousel-wrap').offset().top + 150) {
			animateSection(['#section-blog .item-blog']);
		}


	})
	//end scroll


	//resize window
	$(window).resize(function() {
		//set position text on tree
		setPosTextCircles();
		//set position orbits
		setPosCubePlanets();
		//set position text near planets
		setPosPlanetText();
	})




} //end initMainPage



//animating tree svg
function animateTree() {
	//init animation
	var treeAnimation = new LazyLinePainter(tree, {"ease":"easeLinear","strokeOpacity":1,"reverse":true});
	//
	treeAnimation.on('complete:all',function(item) {if($(item.el).hasClass('fil1')) $(item.el).css('fill','#FEFEFE')});
	//paint svg
	treeAnimation.paint();
	//set visible text after animation complete
	treeAnimation.on('complete', function() { $('.circle').removeClass('circle-hidden') });
	//set animation 1 time
	animateTree.start = false;
	//set visible svg
	$(tree).css('opacity', '1');
}


//set position text near circles
function setPosTextCircles() {
	document.querySelectorAll('circle').forEach(function(item) {
		var circleClass = '.' + $(item).attr('id');
		//position circle relative to window = bounding.top + pageY. subraction position parent section relative to window give result
		var itemTop = (item.getBoundingClientRect().top + pageYOffset - $('#section-about-technology').offset().top) - item.getBoundingClientRect().height + 'px';
		var itemLeft = item.getBoundingClientRect().left + 'px';
		if(circleClass == '.circle1') $(circleClass).css('visibility', 'visible')
		$(circleClass).css({'top': itemTop, 'left': itemLeft});
	})
}


//set position circles around cube
function setPosCubePlanets() {
	var item = document.querySelector('.cubeBenefits');
	var itemTop = (item.getBoundingClientRect().top + pageYOffset - $('#section-benefits').offset().top) + item.getBoundingClientRect().height /2 + 'px';
	var itemLeft = item.getBoundingClientRect().left + item.getBoundingClientRect().width /2 + 'px';
	$('.orbit').css({'top': itemTop, 'left': itemLeft});
}


//set position text near planet
function setPosPlanetText() {
	document.querySelectorAll('.planet').forEach(function(item) {
		itemId = $(item).attr('id');
		var itemTop = (item.getBoundingClientRect().top + pageYOffset - $('#section-benefits').offset().top) + 'px';
		var itemLeft = item.getBoundingClientRect().left + item.getBoundingClientRect().width *1.8 + 'px';
		var planetText = $('.planet-text-wrap').map(function() {
			var planetTextData = $(this).attr('data-for');
			if(planetTextData == itemId) return this
			else return null
		})
		$(planetText[0]).css({'top': itemTop, 'left': itemLeft});
	})
}


//animate planets and text
function animatePlanets() {
	var counter = 0;
	var planetTextCur = '';
	var planetTextNext = '';

	var orbit1 = {name: 'orbit1', firstText: '01', secondText: '04'};
	var orbit2 = {name: 'orbit2', firstText: '02', secondText: '05'};
	var orbit3 = {name: 'orbit3', firstText: '03', secondText: '06'};

	var orbits = [orbit1, orbit2, orbit3];

	$('#section-benefits .nav img').click(function() {
		if(counter == 0) {
			counter ++;
			planetTextCur = '.planet-text1';
			planetTextNext = '.planet-text2';
		}
		else {
			counter--;
			planetTextCur = '.planet-text2';
			planetTextNext = '.planet-text1';
		}
		
		//start animation: 1-fade text near planet; 2-orbit down, text planet fade; 3-rotate planet
		$(planetTextCur).fadeOut('fast', function() {
			var planetId = '#' + $(this).parent().attr('data-for');
			$(planetId).next().css('transform', 'scale(0.58,0.58)');
			$(planetId).find('p').fadeOut(900, function() {
				//$('.orbit1').addClass('animateOrbit1');
				var parents = $(this).parentsUntil('.wrap-center');
				var parent = parents[parents.length - 1];

				var parentClass = $(parent).attr('class').match(/orbit[0-9]/g)[0];
				var animateClass = 'animate' + parentClass;
				$('.' + parentClass).addClass(animateClass);
			});
		});
		
		//set on initial state (animationEnd)
		$('#section-benefits .orbit').on('animationend', function() {
			var itemClass = $(this).attr('class').match(/orbit[0-9]/g)[0];
			$(this).removeClass('animate' + itemClass);
			$(this).find('.animate-planet-orbit').css('transform', 'scale(1,1)');

			//find current text into planet
			var planetTitle = $(this).find('p');

			//find current text near planet
			var planetId = $(planetTitle).parent().attr('id');
			var textNearPlanet = $('.planet-text-wrap').filter(function() {
				if($(this).attr('data-for') == planetId) return this
			});


		
			//find object with name == itemClass
			var curOrbit = orbits.filter(function(item){
				if(item.name == itemClass) return item
			});

			//set text into planet
			if(counter == 0) $(planetTitle).text(curOrbit[curOrbit.length - 1].firstText)
			else $(planetTitle).text(curOrbit[curOrbit.length - 1].secondText)

			//fadeIn text into planet and text near it
			$(planetTitle).fadeIn('slow', function(){
				$(textNearPlanet[0]).find(planetTextNext).fadeIn('fast');
			})
		})

	}) //end click
}

//animating brain svg
function animateBrain() {
	var start = true;
	var brainAnimation = new LazyLinePainter(brain);
	brainAnimation.on('start:brain-11', function(item) {$(item.el).css('stroke-linecap', 'round')});
	brainAnimation.on('start:brain-4', function(item) {$(item.el).css('stroke-linecap', 'round')});
	brainAnimation.on('start:brain-8', function(item) {$(item.el).css('stroke-linecap', 'round')});
	return function(){
		if(start) brainAnimation.paint();
		start = false
	}
}

//animate section items
function animateSection(items) {
	var delay = 0;
	items.forEach(function(item) {
		document.querySelectorAll(item).forEach(function(el) {
			$(el).css('animation-delay', delay + 's');
			$(el).addClass('emergence-left-right');
			delay+=0.2;
		})
	})
}

//-------------------------------------------------------//
//END Main page
//-------------------------------------------------------//