/* Application JavaScript & jQuery */
/*  */


$( document ).ready(function() {
	var $modal = $('.modalContainer');
	var retina = window.devicePixelRatio > 1;
	var currentPatient, pageIndex, modalIndex;
	var containerElement, scroller;
	var pageNumber = 1;
	// INITIALIZE THE SCROLLER
	function initScroller()
	{
		
		containerElement = document.getElementById('timeline');

		scroller = new FTScroller (containerElement, {
			scrollbars: false,
			scrollingY: false,
			bouncing:false
		});
		scroller.addEventListener('scroll', function()
		{
			modPos = $modal.offset().left;
			if(modPos < 1023)
				{
					resetModal();
				}

			diffTempVar = scroller.scrollLeft;
			respondToScroll(diffTempVar);
		});
		/* FAKE SNAP */
		scroller.addEventListener('scrollend', function(){//WHEN THE SCROLL STOPS
		var posArray = [];//FIRST OF TWO ARRAYS THIS HAS THE WAYPOINTS FOR THE TIMELINE
		var compareArray = [];//second OF TWO ARRAYS THIS HAS THE DIFFERENCE BETWEEN THE CURRENT POSITION AND THE WAYPOINTS
		$('.timeHot').each(function(){//ITERATES THROUGH EACH OF THE VISIBLE HOTSPOTS CREATING AN ARRAY OF THEIR WAYPOINT VALUES
			if ($(this).is(':visible'))
			{
				posArray.push(
					parseInt($(this).attr('timelinePosition'))
					);
			};

		});
		arrLength = posArray.length;
		currScrollPos = scroller.scrollLeft;
		for(var i = 0; i < arrLength; i++)//LOOP THAT CREATES THE DIFFERENCE ARRAY TO FIND WHICH IS CLOSEST TO THE CURRENT POSITION
		{
			compareArray.push(Math.abs(currScrollPos - posArray[i]));
		}
		var moveToClosest = compareArray.indexOf(Math.min.apply(Math, compareArray));//GETS THE INDEX OF THE SMALLEST VALUE IN THE COMPARISON ARRAY. THIS IS THE WAYPOINT CLOSEST TO THE CURRENT POSITION ON THE TIMELINE
		snapVal = posArray[moveToClosest];//JUST SETS A VARIABLE TO THE VALUE OF THE CLOSEST WAYPOINT
		if (currScrollPos != snapVal)//IF WE'RE CURRENTLY AT THE WAYPOINT WE DON'T WANT TO FIRE THE SCROLLTO METHOD
		{
			scroller.scrollLeft = snapVal;//SNAP TO THE CLOSEST WAYPOINT
		};
		respondToScroll(snapVal);
		});
	 /*END FAKE SNAP */
	 if (currentPatient == 1) {
			scroller.updateDimensions(1720, 323);
		} else if (currentPatient == 2) {
			scroller.updateDimensions(2200, 323);
		} else if (currentPatient == 3) {
			scroller.updateDimensions(2200, 323);
			} else if (currentPatient == 4) {
			scroller.updateDimensions(2200, 323);
		};
		scroller.scrollLeft = 0;//resets the timeline to 0 in case you are navigating back and forth and have moved the timeline. One of the properties of the scroller object. (see readme)
	};
	// INITIALIZE THE SCROLLER

	/**********MODAL START***************/

	$('.pageModal').on("click", function()
	{
		$('.modalBG, #modalCloseBtn').show();
		$modal.removeClass('modalEnd').addClass('modalStart');
	});

	function resetModal()
	{
		$modal.addClass('modalEnd');
		$('.modalBG').hide();
		setTimeout(function() {
			$modal.removeClass('modalStart modalEnd');}, 1000);
	}

	$('.modalBG, #modalCloseBtn').on('click', function(){
		resetModal();
	})

	/***********MODAL END***********/

	/********************** start swipe navigation **********************************/
	function pageChange(){
		if (retina)
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '@2x.png';
		} else
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '.png';
		}
		
		
	    $('.page-content').fadeOut(100, function()
	    	{
	    		$('.page-content').css('background-image', pageIndex).fadeIn()
	       	});
	}
	 $(".swipeHome").swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function() {
        	$('.splash').show();
        	scroller.destroy();
        },
        tap:function(){//it is important to note that CLICK does not work with the touchswipe and this tap method has to be used instead
         $('.splash').show();
         scroller.destroy();
         // location.reload();
      },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
      });

/****************************** end swipe navigation *******************************/

	$('.continueBtn').click(function(){
		$('.isiContainer').show();
		var isiContainerElement, isiScroller;
		isiContainerElement = document.getElementById('ISI');
		isiScroller = new FTScroller (isiContainerElement, {
			scrollbars: true,
			scrollingX: false,
			bouncing:true
		});
		


// pi button
		$('.piBtn').click(function(){
			$('.isiContainer').hide();
			$('.piContainer').show();
			var piContainerElement, piScroller;
			piContainerElement = document.getElementById('PI');
			piScroller = new FTScroller (piContainerElement, {
				scrollbars: true,
				scrollingX: false,
				bouncing:true
			});
			
		});
		
		


		$('.closeBtn').click(function()
		{
			$('.isiContainer, .piContainer').hide();
		});
	});

	//bubble navigation
	$('.timeHot').click(function(){
		timelineValue = $(this).attr('timelinePosition');
		scroller.scrollTo(timelineValue, 0, true);
	});
	$('.splash-button').click(function(){
		currentPatient = $(this).attr('patient'); //grabs the patient number attribute from the HTML
		if (retina)
		{
			$('.backgroundDIV').css('background-image', 'url(img/section' + currentPatient + 'BG@2x.jpg)');
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '@2x.png'); //change arrow image to current patient
			pageIndex = 'img/s' + currentPatient + 'p1@2x.png';//setting the current page to first patient page
		} else
		{
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '.png'); //change arrow image to current patient
			$('.backgroundDIV').css('background-image', 'url(img/section' + currentPatient + 'BG.jpg)');
			pageIndex = 'img/s' + currentPatient + 'p1.png';//setting the current page to first patient page
		}
		$('.page-content').css('background-image', 'url(' + pageIndex + ')');//change the page backgroun image
		//this next conditional sets the size of the container of the slider image
		$('.s' + currentPatient + 'p1').show().siblings().hide();
		if (currentPatient == 1) {
			$('.raContainer').hide();
			$('#timeline-arrow').show();
			$('.pageModal').show();	
			$('.ftscroller_container').show();
			$('.page-content').show();
			$('#timeline-arrow').width(1720).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow1');
			$('.timeHot').hide();
			$('.timeline1Hotspot').show();
			$('.splash').delay(300).hide();
			initScroller();
		} else if (currentPatient == 2) {
			$('.raContainer').hide();
			$('#timeline-arrow').width(2200).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow2');
			$('.timeHot').hide();
			$('.timeline2Hotspot').show();
			$('.splash').delay(300).hide();
			initScroller();
		} else if (currentPatient == 3) {
			$('.raContainer').hide();
			$('#timeline-arrow').width(2200).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow3');
			$('.timeHot').hide();
			$('.timeline3Hotspot').show();
			$('.splash').delay(300).hide();
			initScroller();
		} else if (currentPatient == 4){
			//$('#defaultMask').show();
			//$('#defaultMask').next('img').show();
			$('#timeline-arrow').hide();
			$('.pageModal').hide();			
			$('.ftscroller_container').hide();
			$('.page-content').hide();
			$('.continueBtn').show();			
			$('.raContainer').show();
			$('.splash').delay(300).hide();
			initScroller();
			//customClose()
		};
		
		
	});
	
	function closeAll() {
  $("section.patients[rel]").each(function() {
    $(this).overlay().close();
  });
	}
		
		
		/*** patient case modal trigger events ***/
	
	$('.modal.case-button').click(function(){
		currentPatient = $(this).attr('patient'); //grabs the patient number attribute from the HTML
		if (retina)
		{
			$('.backgroundDIV').css('background-image', 'url(img/section' + currentPatient + 'BG@2x.jpg)');
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '@2x.png'); //change arrow image to current patient
			pageIndex = 'img/s' + currentPatient + 'p1@2x.png';//setting the current page to first patient page
		} else
		{
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '.png'); //change arrow image to current patient
			$('.backgroundDIV').css('background-image', 'url(img/section' + currentPatient + 'BG.jpg)');
			pageIndex = 'img/s' + currentPatient + 'p1.png';//setting the current page to first patient page
		}
		$('.page-content').css('background-image', 'url(' + pageIndex + ')');//change the page backgroun image
		//this next conditional sets the size of the container of the slider image
		$('.s' + currentPatient + 'p1').show().siblings().hide();
		if (currentPatient == 1) {
			closeAll();
			$('#timeline-arrow').show();
			$('.pageModal').show();			
			$('.ftscroller_container').show();
			$('.page-content').show();
			$('.continueBtn').show();			
			$('.raContainer').hide();
			$('#timeline-arrow').width(1720).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow1');
			$('.timeHot').hide();
			$('.timeline1Hotspot').show();
			initScroller();
		} else if (currentPatient == 2) {	
			closeAll();	
			$('#timeline-arrow').show();
			$('.pageModal').show();			
			$('.ftscroller_container').show();
			$('.page-content').show();
			$('.continueBtn').show();			
			$('.raContainer').hide();			
			$('#timeline-arrow').width(2200).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow2');
			$('.timeHot').hide();
			$('.timeline2Hotspot').show();
			$('#defaultMask').next('img').hide();
			$('#defaultMask').hide();
			initScroller();
		} else if (currentPatient == 3) {	
			closeAll();		
			$('#timeline-arrow').show();
			$('.pageModal').show();			
			$('.ftscroller_container').show();
			$('.page-content').show();
			$('.continueBtn').show();			
			$('.raContainer').hide();
			$('#timeline-arrow').width(2200).removeClass();
			$('#timeline-arrow').addClass('timeline-arrow3');
			$('.timeHot').hide();
			$('.timeline3Hotspot').show();
			$('#defaultMask').next('img').hide();
			$('#defaultMask').hide();
			initScroller();
		
		};
		
		
	});
	
	

	
	
	function pageChange(){
		if (retina)
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '@2x.png';
		} else
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '.png';
		}
		
	    $('.page-content').fadeOut(100, function()
	    	{
	    		$('.page-content').css('background-image', 'url(' + pageIndex + ')').fadeIn();
	       	});
	}
	function scrollPageChange(pat, pg)
	{
		$('.s' + pat + 'p' + pg).show().siblings().hide();
		if (retina)
		{
			pageIndex = 'img/s' + pat + 'p' + pg + '@2x.png';
		} else
		{
			pageIndex = 'img/s' + pat + 'p' + pg + '.png';
		}
		$('.page-content').fadeOut(100, function()
	    	{
	    		$('.page-content').css('background-image', 'url(' + pageIndex + ')').fadeIn();
	       	});
	}
	function respondToScroll(whereTo){
		if(currentPatient == 1)
		{
			if (whereTo <= 89)
			{
				if (pageNumber != 1) {
					scrollPageChange(currentPatient, 1);
				};
				pageNumber = 1;
				
				
			} else if ((whereTo >= 90) && (whereTo <= 355))
			{
				if (pageNumber != 2) {
					scrollPageChange(currentPatient, 2);
				}
				pageNumber = 2;
				
			} else
			{
				if (pageNumber != 3) {
					scrollPageChange(currentPatient, 3);
				}
				pageNumber = 3;
				
			}
		} else if (currentPatient == 2)
		{
			if (whereTo < 101)
			{
				if (pageNumber != 1) {
					scrollPageChange(currentPatient, 1);
				};
				pageNumber = 1;
			} else if ((whereTo >= 101) && (whereTo <= 599))
			{
				if (pageNumber != 2) {
					scrollPageChange(currentPatient, 2);
				};
				pageNumber = 2;
			} else if ((whereTo >= 600) && (whereTo <= 874))
			{
				if (pageNumber != 3) {
					scrollPageChange(currentPatient, 3);
				};
				pageNumber = 3;
			} else
			{
				if (pageNumber != 4) {
					scrollPageChange(currentPatient, 4);
				};
				pageNumber = 4;
			}
		} else if (currentPatient == 3) 
		{
			if (whereTo < 99)
			{
				if (pageNumber != 1) {
					scrollPageChange(currentPatient, 1);
				};
				pageNumber = 1;
			} else if ((whereTo >= 100) && (whereTo <= 679))
			{
				if (pageNumber != 2) {
					scrollPageChange(currentPatient, 2);
				};
				pageNumber = 2;
			} else if ((whereTo >= 680) && (whereTo <= 825))
			{
				if (pageNumber != 3) {
					scrollPageChange(currentPatient, 3);
				};
				pageNumber = 3;
			} else
			{
				if (pageNumber != 4) {
					scrollPageChange(currentPatient, 4);
				};
				pageNumber = 4;
			}
		};
	}

/********************** prevent ruber band effect ***************************************/
		// Uses document because document will be topmost level in bubbling
		$(document).on('touchmove',function(e){
		  e.preventDefault();
		});
		
		var scrolling = false;
		
		// Uses body because jquery on events are called off of the element they are
		// added to, so bubbling would not work if we used document instead.
		$('body').on('touchstart','.scrollable',function(e) {
		
			// Only execute the below code once at a time
			if (!scrolling) {
				scrolling = true;   
				if (e.currentTarget.scrollTop === 0) {
				  e.currentTarget.scrollTop = 1;
				} else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
				  e.currentTarget.scrollTop -= 1;
				}
				scrolling = false;
			}
		});
		
		// Prevents preventDefault from being called on document if it sees a scrollable div
		$('body').on('touchmove','.scrollable',function(e) {
		  e.stopPropagation();
		});
/********************** prevent ruber band effect ***********************************/
	// RESET CHART BARS ON CLICK OF CLOSE BUTTON IN OVERLAYS
	$('.info_modal .close').on('click', function() {
		$('.jqbar').html('');
	});

});
