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