/**
 * Get boolean for user browser
 * @return {Boolean}
 */
function isFirefox() {
  browser = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
  return browser;
};

function isOpera() {
	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	browser = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  	return browser;
};

function isIE(){
	browser = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
	return browser;
};

function isChrome(){
	browser = !!window.chrome && !isOpera();              // Chrome 1+
	return browser;
};

function isSafari(){
	// At least Safari 3+: "[object HTMLElementConstructor]"
	browser = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	return browser;
};
