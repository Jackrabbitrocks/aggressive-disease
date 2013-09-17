$( document ).ready(function() {
	var isiContainerElement, isiScroller;
	isiContainerElement = document.getElementById('ISI');
	isiScroller = new FTScroller (isiContainerElement, {
			scrollbars: true,
			scrollingX: false,
			bouncing:true
		});
	$('.piBtn').click(function(){return});
	$('.closeBtn').click(function(){window.location.href = 'index.html'});
});