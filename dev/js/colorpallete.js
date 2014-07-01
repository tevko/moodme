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