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