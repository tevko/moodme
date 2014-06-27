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
