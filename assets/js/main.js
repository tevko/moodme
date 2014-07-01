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
		s.activator.onclick = function (e) {
			toggleState(s.controlPanel, 'inactive', 'active');
			e.preventDefault();
			toggleText($('.uiControlPanel'),'Show Controls','Hide Controls', $('.uiControlPanel-activate'));
		};
		$('header, main').click(function() {
			if ( $(s.controlPanel).is("[data-state='" + 'active' + "']") ) {
				toggleState(s.controlPanel, 'inactive', 'active');
				$(s.activator).text('Show Controls');
			}
		});
	}
};
var colorPallete = {
	settings : {
		colorSelect: $('.numColrs'),
		colorContainer: $('.block-colorPallete'),
		colorTemplate: $('.colorObject').html(),
		colorItem : $('.colorPallete-item')
	},

	init: function() {
		removeUiItem('.colorPallete-item');
		this.changePalleteNum();
		this.itemWidth();
	},

	changePalleteNum: function() {
		var s = this.settings;
		var outside = this;
		s.colorSelect.change(function() {
			var num = $(this).val();
			s.colorContainer.empty();
			for (var i = 0; i < num; i++) {
				s.colorContainer.append(s.colorTemplate);
			};
			outside.itemWidth();
			$('.colorPallete-item').each(function() {
				var rand = '#'+Math.floor(Math.random()*16777215).toString(16);
				$(this).css('background-color', rand);
			});
		});

	},

	itemWidth: function() {
		
		var length = $('.colorPallete-item').length;
		$('.colorPallete-item').width(100/length + '%');
		$('.deletItem').click(function(evt) {
			length = length - 1;
			$('.colorPallete-item').width(100/length + '%');
		});
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

//helper functions to keep our js DRY

var toggleState = function (elem, one, two) {
	var elem = $(elem)[0];
  	elem.setAttribute('data-state', elem.getAttribute('data-state') === one ? two : one);
};

var toggleText = function (activeElem, inactiveText, activeText, clickElem) {
	if ( activeElem.is("[data-state='" + 'inactive' + "']") ) {
		clickElem.text(inactiveText);
	} else if ( activeElem.is("[data-state='" + 'active' + "']") ){
		clickElem.text(activeText);
	}
};

var removeUiItem = function (elem) {
	$('.blockContainer').on('click','.deletItem', function() {
		$(this).parent(elem).remove();
	});
};
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
        //enable colorPallete functionality
        colorPallete.init();
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
		headerColor : $('#hdrColor'),
		addBlocksButton : $('.blockWidget-add'),
		blockContainer : $('.blockContainer'),
		editBlockButton : $('.blockWidget-settings_Show'),
		submitButton: $('.blockWidget-settings_Submit')
	},

	init: function() {
		this.title();
		this.showControls();
		this.changeColors();
		this.addBlocks();
		this.editBlocks();
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
				$('.blockWidget').show();
			} else {
				$('.blockWidget').hide();
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
	},

	addBlocks : function () {
		var s = this.settings;
		var newBlockTemplate = $('.blockObject').html();
		s.addBlocksButton.click(function() {
			s.blockContainer.append(newBlockTemplate);
		});
	},

	editBlocks : function () {
		var s = this.settings;
		removeUiItem('.block');
		$('.blockContainer').on('click', '.blockWidget-settings_Show', function() {
			var contextMenu = $(this).siblings('.blockWidget-settings');
			var thisButton = $(this);
			toggleState(contextMenu, 'inactive', 'active');
			toggleText(contextMenu,'Edit','Close', thisButton);
		});
		$('.blockContainer').on('click', '.blockWidget-settings_Submit', function() {
			var src = $(this).parents('.blockWidget-settings').find('.blockWidget-settings_src').val();
			var img = $(this).parents('.blockWidget-settings').find('.isImage').is(':checked');
			var iframe = $(this).parents('.blockWidget-settings').find('.isIframe').is(':checked');
			var video = $(this).parents('.blockWidget-settings').find('.isVideo').is(':checked');
			var bContent = $(this).parents('.blockWidget-settings').siblings('.blockContent');
			bContent.empty();
			if ( img ) {
				bContent.append('<img src="' + src + '"/>');
			} else if ( video ) {
				bContent.append('<video>' + '<source src=' + src + '/>' + '</video>');
			} else if ( iframe ) {
				bContent.append('<iframe src="' + src + '"/>');
			}
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