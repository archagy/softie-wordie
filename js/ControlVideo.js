/**
 * @author Archagy
 * Control of player buttons.
 */

var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn, controls;
function intializePlayer() {
  // Set object references
  vid = document.getElementById("my_video");
  controls = document.getElementById('video_controls_bar');
  playbtn = document.getElementById("playpausebtn");
  seekslider = document.getElementById("seekslider");
  curtimetext = document.getElementById("curtimetext");
  durtimetext = document.getElementById("durtimetext");
  mutebtn = document.getElementById("mutebtn");
  volumeslider = document.getElementById("volumeslider");
  fullscreenbtn = document.getElementById("fullscreenbtn");
  
  // Add event listeners
  playbtn.addEventListener("click", playPause, false);
  seekslider.addEventListener("change", vidSeek, false);
  vid.addEventListener("timeupdate", seektimeupdate, false);
  mutebtn.addEventListener("click", vidmute, false);
  volumeslider.addEventListener("change", setvolume, false);
  fullscreenbtn.addEventListener("click", toggleFullScreen, false);
  if(isFirefox){
    document.addEventListener('mozfullscreenchange', exitHandler, false);
  }
  hideElements();
}
window.onload = intializePlayer;



/**
 * Fix bug in firefox when goes in fullscreen mode control 
 * player dont stay in bottom
 * 
 */
function exitHandler()
{
    if (document.mozFullScreen)
    {
      $('#video_controls_bar').css({position: 'fixed'});
    }else{
      $('#video_controls_bar').css({position: 'absolute'});
    }
}

/**
 * Hide controls when cursor is not over on player and hide as well when cursor dont move.
 * 
 */
function hideElements(){
    $('#video_controls_bar').hide();
    var i = null;
  $("#video-container").mousemove(function() {
      clearTimeout(i);
    $('#video_controls_bar').show();
    $("body").css("cursor", "default");
    i = setTimeout('$("#video_controls_bar").hide(); $("body").css("cursor", "none");', 3000);
}).mouseleave(function() {
    clearTimeout(i);
    $('#video_controls_bar').hide();
});
}



/**
 * Play pause event
 * 
 */
function playPause() {
  if (vid.paused) {
    vid.play();
    playbtn.style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE4IDE4IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik03LjAxMSwxNi4yODVjMCwwLjY3Mi0wLjYxMiwxLjIxNS0xLjM2NiwxLjIxNUg0LjIyM2MtMC43NTQsMC0xLjM2NS0wLjU0My0xLjM2NS0xLjIxNVYxLjcxNA0KCQljMC0wLjY3LDAuNjExLTEuMjE0LDEuMzY1LTEuMjE0aDEuNDIyYzAuNzU0LDAsMS4zNjYsMC41NDQsMS4zNjYsMS4yMTRWMTYuMjg1eiIvPg0KCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNS4xNDIsMTYuMjg1YzAsMC42NzItMC41ODYsMS4yMTUtMS4zMDgsMS4yMTVoLTEuMzYzYy0wLjcyMywwLTEuMzA4LTAuNTQzLTEuMzA4LTEuMjE1VjEuNzE0DQoJCWMwLTAuNjcsMC41ODUtMS4yMTQsMS4zMDgtMS4yMTRoMS4zNjNjMC43MjIsMCwxLjMwOCwwLjU0NCwxLjMwOCwxLjIxNFYxNi4yODV6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==)";
    playbtn.style.backgroundSize = "50% 50%";
  } else {
    vid.pause();
    playbtn.style.background = "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSI5MSA5MSAxOCAxOCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyA5MSA5MSAxOCAxOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBvcGFjaXR5PSIwLjk1IiBmaWxsPSIjRkZGRkZGIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZD0iTTkzLjI1OCw5MS4yMzlsMTQuNjkyLDcuNjgxYzEuMTQxLDAuNTk2LDEuMTQxLDEuNTYzLDAsMi4xNTkNCgkJbC0xNC42OTIsNy42ODNjLTEuMTQsMC41OTctMi4wNjQsMC4wMzctMi4wNjQtMS4yNDhWOTIuNDg3QzkxLjE5NCw5MS4yMDIsOTIuMTE4LDkwLjY0Myw5My4yNTgsOTEuMjM5eiIvPg0KPC9nPg0KPC9zdmc+DQo=)";
    playbtn.style.backgroundSize = "100% 100%";
  }
}

/**
 * Get current time on the video
 * 
 */
function vidSeek() {
  var seekto = vid.duration * (seekslider.value / 100);
  vid.currentTime = seekto;
}


/**
 * Update time on seek player
 * 
 */
function seektimeupdate() {
  var nt = vid.currentTime * (100 / vid.duration);
  seekslider.value = nt;
  var curmins = Math.floor(vid.currentTime / 60);
  var cursecs = Math.floor(vid.currentTime - curmins * 60);
  var durmins = Math.floor(vid.duration / 60);
  var dursecs = Math.floor(vid.duration - durmins * 60);
  if (cursecs < 10) {
    cursecs = "0" + cursecs;
  }
  if (dursecs < 10) {
    dursecs = "0" + dursecs;
  }
  if (curmins < 10) {
    curmins = "0" + curmins;
  }
  if (durmins < 10) {
    durmins = "0" + durmins;
  }
  curtimetext.innerHTML = curmins + ":" + cursecs;
  durtimetext.innerHTML = durmins + ":" + dursecs;
}


/**
 * Mute Event
 * 
 */
function vidmute() {
  if (vid.muted) {
    vid.muted = false;
    mutebtn.innerHTML = "Mute";
  } else {
    vid.muted = true;
    mutebtn.innerHTML = "Unmute";
  }
}

/**
 * Set volumen event
 * 
 */
function setvolume() {
  vid.volume = volumeslider.value / 100;
}


/**
 * Fullscreen option works in all browser
 *
 */
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      vid.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      vid.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      vid.mozRequestFullScreen();      
      
    } else if (document.documentElement.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      $(document).unbind("keyup", escListener);
    }
  }
}

/**
 *  Hide captions...TODO 
 */
$(document).ready(function(){
	$('#subtitles').click(function(){
		for (var i = 0; i < video.textTracks.length; i++) {
	 		if(video.textTracks[i].mode == 'showing'){
	 			video.textTracks[i].mode = 'hidden';	
	 		}else{
	 			video.textTracks[i].mode = 'showing';	
	 		}
		}
	});

});