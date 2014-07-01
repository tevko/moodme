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