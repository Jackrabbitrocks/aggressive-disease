// RABBIT.JS
$( document ).ready(function() {

	var posArray = []; //SET THE ARRAY WHICH WILL CONTAIN THE CURRENT TIMELINE'S WAYPOINTS
	//cache reused refrences
	var $modal = $('.modalContainer');
	var $buttons = $('.swipeHome, .continueBtn');
	var $piButton = $('.piBtn');
	var $timelineArrow = $('#timeline-arrow');
	var $pageContent = $('.page-content');
	var $bgDiv = $('.backgroundDIV');

	var retina = window.devicePixelRatio > 1;
	var currentPatient, pageIndex, modalIndex, containerElement, scroller;
	var pageNumber = 1;
	function initPatient (patientNumber)
	{
		$('.raContainer, .timeHot').hide();
		$('#timeline-arrow, .pageModal, .ftscroller_container, .page-content').show();
		$timelineArrow.addClass('timeline-arrow' + currentPatient);
		if (patientNumber != 4)
		{
			$('.timeline' + currentPatient + 'Hotspot').show();
			$('.splash').delay(300).hide();
		}
	}

	function closeAll() 
	{
		$("section.patients[rel]").each(function() {
			$(this).overlay().close();
		});
	}
	function initRA () {//position buttons for risk assesment module
		$buttons.removeClass('patientNav').addClass('initRA');
		$piButton.addClass('initRA');
	}
	function initPatientNav () {//position buttons for patient cases
		$buttons.removeClass('initRA').addClass('patientNav');
		$piButton.removeClass('initRA');
	}
	function setWaypointArray () 
	{
		//reset position array to nothing
		posArray = [];
		$('.timeHot').each(function()
		{
		//ITERATES THROUGH EACH OF THE VISIBLE HOTSPOTS CREATING AN ARRAY OF THEIR WAYPOINT VALUES
			if ($(this).is(':visible')) //ONLY READ VISIBLE WAYPOINTS
			{
				posArray.push(
					//add to the position array
					parseInt($(this).attr('timelinePosition'), 10)
					//pushes the timeline attribute value manually set on each waypoint
					);
			};

		});
	};
	function resetModal()
	{
		$modal.addClass('modalEnd');
		$('.modalBG').hide();
		setTimeout(function() {
			$modal.removeClass('modalStart modalEnd');}, 1000);
	}
	function pageChange()
	{
		if (retina)
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '@2x.png';
		} else
		{
			pageIndex = 'img/s' + currentPatient + 'p' + pageNumber + '.png';
		}
		$pageContent.fadeOut(100, function()
		{
			$pageContent.css('background-image', pageIndex).fadeIn();
		});
	}
	// INITIALIZE THE SCROLLER USED BY THE TIMELINE ELEMENT
	function initScroller()
	{
		containerElement = document.getElementById('timeline');

		scroller = new FTScroller (containerElement, 
		{
			scrollbars: false,
			scrollingY: false,
			bouncing:false
		});
		scroller.addEventListener('scroll', function()
		{
			modPos = $modal.offset().left;//IF SLIDER IS VISIBLE RESET IT
			if(modPos < 1023)
			{
				resetModal();
			}

			diffTempVar = scroller.scrollLeft;
			respondToScroll(diffTempVar); //FUNCTION THAT CONTROLS CURRENT PAGE BASED ON TIMELINE POSITION
		});

			/* FAKE SNAP */

		scroller.addEventListener('scrollend', function()
		{
			//WHEN THE SCROLL STOPS FIND THE CLOSEST WAYPOINT AND MOVE THE TIMELINE TO THAT POINT
			var compareArray = [];
			//second OF TWO ARRAYS THIS HAS THE DIFFERENCE BETWEEN THE CURRENT POSITION AND THE WAYPOINTS
			var arrLength = posArray.length;
			currScrollPos = scroller.scrollLeft;
			for(var i = 0; i < arrLength; i++)
			//LOOP THAT CREATES THE DIFFERENCE ARRAY TO FIND WHICH IS CLOSEST TO THE CURRENT POSITION
			{
				compareArray.push(Math.abs(currScrollPos - posArray[i]));
				//compare current position to each waypoint position and push to the compare array
			}
			var moveToClosest = compareArray.indexOf(Math.min.apply(Math, compareArray));
			//GETS THE INDEX OF THE SMALLEST VALUE IN THE COMPARISON ARRAY. THIS IS THE WAYPOINT CLOSEST TO THE CURRENT POSITION ON THE TIMELINE
			snapVal = posArray[moveToClosest];//JUST SETS A VARIABLE TO THE VALUE OF THE CLOSEST WAYPOINT
			if (currScrollPos != snapVal)//IF WE'RE CURRENTLY AT THE WAYPOINT WE DON'T WANT TO FIRE THE SCROLLTO METHOD
			{
				scroller.scrollLeft = snapVal;
				//SNAP TO THE CLOSEST WAYPOINT
			};
			respondToScroll(snapVal);
			//UPDATE VEIW TO REFECT NEW TIMELINE LOCATION
		});
				/*END FAKE SNAP */
		if (currentPatient == 1) 
		{
			scroller.updateDimensions(1720, 323);
		} else if (currentPatient == 2) 
		{
			scroller.updateDimensions(2200, 323);
		} else if (currentPatient == 3) 
		{
			scroller.updateDimensions(2200, 323);
		};
	};
	// END INITIALIZE THE SCROLLER

	/**********MODAL START***************/
// SLIDE IN
	$('.pageModal').on("click", function()
	{
		$('.modalBG, #modalCloseBtn').show();
		$modal.removeClass('modalEnd').addClass('modalStart');
	});
// END SLIDE IN 
	$('.modalBG, #modalCloseBtn').on('click', function(){
		resetModal();
	});
	/***********MODAL END***********/

	/********************** start swipe navigation **********************************/
	
	$(".swipeHome").swipe( 
	{
        //Generic swipe handler for all directions
        swipeLeft:function() 
        {
        	$('.splash').show();
        	if(currentPatient !== 4)
        	{
        		scroller.destroy();
        	}
        },
        tap:function()
        {
        //it is important to note that CLICK does not work with the touchswipe and this tap method has to be used instead
        	$('.splash').show();
        	if(currentPatient !== 4)
        	{
        		scroller.destroy();
        	}
         // location.reload();
     	},
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
    });

	/****************************** end swipe navigation *******************************/
// CONTINUE BUTTON SHOWS THE ISI
	$('.continueBtn').on('click', function ()
	{
		if (currentPatient == 4) 
			{
				$piButton.removeClass('initRA')
			};
		$('.isiContainer, .ftscroller_container').show();
		var isiContainerElement, isiScroller;
		isiContainerElement = document.getElementById('ISI');
		isiScroller = new FTScroller (isiContainerElement,
		{
			scrollbars: true,
			scrollingX: false,
			bouncing: true
		})
	});


// pi button shows the pi layer and creates scroll element
	$piButton.click(function()
	{
		$('.isiContainer').hide();
		$('.piContainer, .ftscroller_container').show();
		var piContainerElement, piScroller;
		piContainerElement = document.getElementById('PI');
		piScroller = new FTScroller (piContainerElement,
		{
			scrollbars: true,
			scrollingX: false,
			bouncing:true
		});

	});

	$('.closeBtn').click(function()
	{
		$('.isiContainer, .piContainer').hide();
		if (currentPatient == 4) 
			{
				$piButton.addClass('initRA')
			};
	});

	//bubble navigation for timeline
	// grab the value from the html element and move the timeline there
	$('.timeHot').click(function(){
		timelineValue = $(this).attr('timelinePosition');
		scroller.scrollTo(timelineValue, 0, true);
	});

	// INITIALIZE THE SELECTED PATIENT
	$('.splash-button').click(function()
	{
		var posArray = [];//CLEAR THE WAYPOINT ARRAY

		currentPatient = $(this).attr('patient'); //grabs the patient number attribute from the HTML
		if (retina)
		{
			$bgDiv.css('background-image', 'url(img/section' + currentPatient + 'BG@2x.jpg)');
			pageIndex = 'img/s' + currentPatient + 'p1@2x.png';//setting the current page to first patient page
		} else
		{
			$bgDiv.css('background-image', 'url(img/section' + currentPatient + 'BG.jpg)');
			pageIndex = 'img/s' + currentPatient + 'p1.png';//setting the current page to first patient page
		}
		$pageContent.css('background-image', 'url(' + pageIndex + ')');
		//change the page backgroun image
		//this next conditional sets the size of the container of the slider image
		$('.s' + currentPatient + 'p1').show().siblings().hide();

		if (currentPatient == 1) {
			initPatientNav();
			$timelineArrow.width(1720).removeClass();
			initPatient(1);
			initScroller();
		} else if (currentPatient == 2) {
			initPatientNav();
			$timelineArrow.width(2200).removeClass();
			initPatient(2);
			initScroller();
		} else if (currentPatient == 3) {
			initPatientNav();
			$timelineArrow.width(2200).removeClass();
			initPatient(3);
			initScroller();
		} else if (currentPatient == 4){
			initRA();
			$('#timeline-arrow, .pageModal, .ftscroller_container, .page-content').hide();
			$('.continueBtn, .raContainer').show();			
			$('.splash').delay(300).hide();
			$piButton.on('click', function(){
				$('.isiContainer').hide();
				$('.piContainer, .ftscroller_container').show();
				var piContainerElement, piScroller;
				piContainerElement = document.getElementById('PI');
				piScroller = new FTScroller (piContainerElement, {
					scrollbars: true,
					scrollingX: false,
					bouncing:true
				});
				$('.closeBtn').on('click', function(){$('.piContainer').hide()});
			});
		};
		setWaypointArray();
	});




/*** patient case modal trigger events ***/

	$('.modal.case-button').click(function(){
		currentPatient = $(this).attr('patient'); //grabs the patient number attribute from the HTML
		initPatientNav();
		if (retina)
		{
			$bgDiv.css('background-image', 'url(img/section' + currentPatient + 'BG@2x.jpg)');
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '@2x.png'); //change arrow image to current patient
			pageIndex = 'img/s' + currentPatient + 'p1@2x.png';//setting the current page to first patient page
		} else
		{
			// $('.arrow').attr('src', 'img/timeline' + currentPatient + '.png'); //change arrow image to current patient
			$bgDiv.css('background-image', 'url(img/section' + currentPatient + 'BG.jpg)');
			pageIndex = 'img/s' + currentPatient + 'p1.png';//setting the current page to first patient page
		}

		$pageContent.css('background-image', 'url(' + pageIndex + ')');//change the page backgroun image
		//this next conditional sets the size of the container of the slider image
		$('.s' + currentPatient + 'p1').show().siblings().hide();// RESETS TO THE FIRST PAGE OF THE CURRENT PATIENT CASE

		closeAll();
		//moved all the actions that were happening into initPatient and moved it outside of the condition because it was called in every case
		if (currentPatient == 1) {
			$timelineArrow.width(1720).removeClass();
			$timelineArrow.addClass('timeline-arrow1');
			initScroller();
			initPatient(1);
		} else if (currentPatient == 2) {	
			$timelineArrow.width(2200).removeClass();
			$timelineArrow.addClass('timeline-arrow2');
			initScroller();
			initPatient(2);
		} else if (currentPatient == 3) {	
			$timelineArrow.width(2200).removeClass();
			$timelineArrow.addClass('timeline-arrow3');
			initScroller();	
			initPatient(3);	
		};
		setWaypointArray();
		
	});
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
	$pageContent.fadeOut(100, function()
	{
		$pageContent.css('background-image', 'url(' + pageIndex + ')').fadeIn();
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
