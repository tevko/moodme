var activateControls = {
	settings : {
		controlPanel : '.uiControlPanel',
		activator : document.querySelector('.uiControlPanel-activate')
	},

	init: function() {
		this.work();
	},

	work: function() {
		var s = this.settings;
		var toggleState = function (elem, one, two) {
			var elem = document.querySelector(elem);
		  	elem.setAttribute('data-state', elem.getAttribute('data-state') === one ? two : one);
		};
		s.activator.onclick = function (e) {
			toggleState(s.controlPanel, 'inactive', 'active');
			e.preventDefault();
			if ( $(s.controlPanel).is("[data-state='" + 'inactive' + "']") ) {
				$(this).text('Show Controls');
			} else if ( $(s.controlPanel).is("[data-state='" + 'active' + "']") ){
				$(this).text('Hide Controls');
			}
		};
	}
};

function launchFullScreen(element) {
	$('.mainHeader-logo').dblclick(function() {
		this.element = element;
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	});
}

//Main Javascripts

(function($ , window , undefined) {
    $(function() {
    	//enable videos
        videos.init();
        //enable off canvas
        activateControls.init();
        //enable full screen functionality
		launchFullScreen(document.documentElement);
		//enable UI controls
		appUi.init();
    });
})(jQuery , window );

var appUi = {
	settings : {
		docTitleInput : $('#DocTitle'),
		docTitle : $('title'),
		docTitleSubmit : $('#docTitleSubmit'),
		showHide : $('#showSettings'),
		blockControlElement : $('.blockWidget'),
		body : $('body'),
		bodyColor: $('#bgColor'),
		header : $('.mainHeader'),
		headerColor : $('#hdrColor')
	},

	init: function() {
		this.title();
		this.showControls();
		this.changeColors();
	},

	title: function() {
		var s = this.settings;
		s.docTitleSubmit.click(function() {
			var title = s.docTitleInput.val();
			s.docTitle.empty();
			s.docTitle.append(title);
		});
	},

	showControls: function () {
		var s = this.settings;
		s.showHide.click(function() {
			if ( s.showHide.prop('checked') ) {
				s.blockControlElement.show();
			} else {
				s.blockControlElement.hide();
			}
		});
	},

	changeColors: function () {
		var s = this.settings;
		s.bodyColor.change(function() {
			var color = $(this).val();
			s.body.css('background-color', color);
		});
		s.headerColor.change(function() {
			var color = $(this).val();
			s.header.css('background-color', color);
		});
	}

};
var videos = {
	settings : {
		video : $('video')
	},

	init: function() {
		s = this.settings;
		this.work();
	},

	work: function() {
		s.video.prop('muted', true);
		s.video.on('mouseenter', function() {
			this.play();
		});
		s.video.on('mouseleave', function() {
			this.pause();
			this.currentTime = 0;
		});
	}
};