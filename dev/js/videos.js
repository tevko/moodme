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