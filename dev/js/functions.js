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