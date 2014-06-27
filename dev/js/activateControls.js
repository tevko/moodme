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