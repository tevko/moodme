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