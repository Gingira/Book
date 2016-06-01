google.setOnLoadCallback(function() {
    // Place init code here instead of $(document).ready()
	
	//alert("The browser version is:" + jQuery.browser.version);
	if ($.browser.msie && $.browser.version.substr(0,1)<7) {
		window.location("http://www.steveandjacqs.com/sorry-ie6");
	};
	
	$(".hide").hide();
	$("div.section").show();
	
	//SETUP VARS: MAIN WINDOW, CONTENT + OFFSET
	var windowW, windowH, contentW, offsetX, offsetY;
	//SETUP VARS: POSITIONING ELEMENTS
	var dottedBigdayOffsetX, dottedBigdayOffsetY, homeOffsetX, dottedJourneyOffsetX, dottedJourneyOffsetY, journeyOffsetX, journeyOffsetY, dottedBlogOffsetX, dottedBlogOffset, blogOffsetX;
	//SETUP VARS: VIEWPORT NAVIGATION
	var homePosX, homePosY, bigdayPosX, bigdayPosY, journeyPosX, journeyPosY, blogPosX, blogPosY;
	
	//CREATE SETUP FUNCTION
	function setupSpace(){
		//ESTABLISH THE VIEWPORT WIDTH + HEIGHT, AND CONTENT WIDTH
		windowW = $(window).width();
		windowH = $(window).height();
		contentW = 800;
		
		//WORK OUT THE OFFSET (ALL CONTENT 800px WIDE
		offsetX = (windowW/2) - (contentW/2);
		offsetY = (windowH/2) - ($('div#section_home').height()/2);
		
		dottedBigdayOffsetX = offsetX + contentW;
		dottedBigdayOffsetY = offsetY + 147;
		homeOffsetX = offsetX + contentW + 2115;
		dottedJourneyOffsetX = homeOffsetX + 245;
		dottedJourneyOffsetY = offsetY + 213;
		journeyOffsetX = homeOffsetX - offsetX;
		journeyOffsetY = offsetY + 2528;
		journeyH = windowH;
		dottedBlogOffsetX = homeOffsetX + 505;
		dottedBlogOffsetY = offsetY + 213;
		blogOffsetX = offsetX + contentW + 4820;
		
		$('div#section_bigday').css({'width' : windowW, 'height' : journeyH});
		$('div#dotted-bigday').css({'left' :  dottedBigdayOffsetX + 'px', 'top' : dottedBigdayOffsetY + 'px'});
		$('div#section_home').css({'left' :  homeOffsetX + 'px', 'top' : offsetY + 'px'});
		$('div#dotted-journey').css({'left' :  dottedJourneyOffsetX + 'px', 'top' : dottedJourneyOffsetY + 'px'});
		$('div#section_journey').css({'width' : windowW, 'height' : journeyH, 'left' :  journeyOffsetX + 'px', 'top' : journeyOffsetY + 'px'});
		$('div#dotted-blog').css({'left' :  dottedBlogOffsetX + 'px', 'top' : dottedBlogOffsetY + 'px'});
		$('div#section_blog').css({'left' :  blogOffsetX + 'px', 'top' : offsetY + 'px', 'padding-right' :  offsetX + 'px'});
		
		homePosX = homeOffsetX - offsetX;
		//homePosY = 0;
		//bigdayPosX = 0;
		//bigdayPosY = 0;
		journeyPosX = journeyOffsetX;
		journeyPosY = journeyOffsetY;
		blogPosX = blogOffsetX - offsetX;
		//blogPosY = 0;
		
		/*if(windowW<=1200){
			$('a.onepagelove').css({'width' : '28px'});
		}else{
			$('a.onepagelove').css({'width' : '162px'});
		}*/
	};
	//CALL SETUP FUNCTION
	setupSpace();
	
	//CREATE WINDOW RESIZE EVENT FUNCTION
	var resizeTimer = null;
	
	$(window).resize(function() {
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() { setupSpace() }, 100);
	});
	
	//SCROLL VIEWPORT TO INITIAL LOCATION (HOME)
	$('html, body').scrollIt( {top:0, left:homePosX}, 0); //HOME
	$("div#ad").delay(500).animate({top: 0}); // SHOW ADVERT
	//$('html, body').scrollTo( {top:0, left:0}, 0); //BIGDAY
	//$(document).scrollTo( {top:journeyPosY, left:journeyPosX}, 0); //JOURNEY
	//$(document).scrollTo( {top:0, left:blogPosX}, 0); //BLOG
		
	//CREATE HOMEPAGE BUSTS QUOTES ARRAY
	var quotes = new Array();
	quotes[0] = "Mushroom gorge?";
	quotes[1] = "Hooray Henry!";
	quotes[2] = "Home James!";
	quotes[3] = "Spiffing wot wot!";
	quotes[4] = "Jolly good show!";
	
	$("li.nav-busts").hover(
		function () {
			//alert("YES");
			$(this).append('<span class="bubble tk-museo-slab">' + quotes[Math.floor(Math.random()*5)] + '</span>');
		}, 
		function () {
			$(this).find("span:last").remove();
		}
	);
	
	function setPage(page){
		currPage = page;
		navItem = "li.nav-" + page;
		$("li.nav_item").removeClass('current');
		$(navItem).addClass('current');
	};
	
	var dotted = null, completeHover = true, currPage = "HOME";
	$("li#section_home_bigday, li#section_home_journey, li#section_home_blog").hover(
		function () {
			var $id = $(this).attr('id').replace("section_home_", "");
			
			dotted = 'div#dotted-' + $id;
			$(dotted).show();
			$(this).append('<span class="balloons"></span>');
			
			switch ($id){
			case "bigday":
				//alert("bigday");
				$(this).click(function() {
				  completeHover = false;
				  setupBigday();
				  return false;
				});
				if(currPage == "bigday"){ completeHover = false }else{ completeHover = true };
				break;
			case "journey":
				//alert("journey");
				$(this).click(function() {
				  setupJourney();
				  return false;
				});
				if(currPage == "journey"){ completeHover = false }else{ completeHover = true };
				break;
			case "blog":
				//alert("blog");
				$(this).click(function() {
				  setupBlog();
				  return false;
				});
				if(currPage == "blog"){ completeHover = false }else{ completeHover = true };
				break;
			}
		}, 
		function () {
			if(completeHover){
				var $id = $(this).attr('id').replace("section_home_", "");
				
				dotted = 'div#dotted-' + $id;
				$(dotted).hide();
				$(this).find("span:last").remove();
			}
		}
	);

	// SHOW/HIDE HOME CONTENT
	function homeContent(state){
		if(state == "SHOW"){
			$("div#ad").stop().animate({top: 0});
			$("div#sharing").stop().animate({bottom: 0});
		}else{
			$("div#ad").stop().animate({top: -50});
			$("div#sharing").stop().animate({bottom: -50});
		}
	}
	
	//###############################
	// HOME
	//###############################
	function setupHome(page, axis){
		$('html, body').scrollIt( {top:0, left:homePosX}, 800, axis, function(){
			homeContent("SHOW");
			$('div#footer, div#webfontawards').css({'right' : '2px'});
			$(".hide").hide();
			$("ul.nav li").find("span.balloons").remove();
			completeHover = true;
			setPage("home");
			
			if(page == "bigday"){ $("div#dotted-bigday").show(); setupBigday(); };
	  		if(page == "journey"){ $("div#dotted-journey").show(); setupJourney(); };
			if(page == "blog"){ $("div#dotted-blog").show(); setupBlog(); };
			}
		); //HOME
	};

	// FORM :: VALIDATE + SUBMIT
	$("span#submit").click(function(){
		$('#subscribe').submit();
	});

	$("input#email").click(function(){
		$("#response").slideUp();
	});

	$('#subscribe').submit(function(){
	    // HIDE ANY PREVIOUS RESPONSES
	    $("#response").slideUp();

	    // SEND DATA
	    $data = $(this).serialize();
	    $.ajax({  
	        type: "GET",
	        url: '/wp-content/themes/steveandjacqs/lib/form_signup.php',
	        cache: false,  
	        data: $data,
	        success: function(data){
	            
	            var msgs = data.split("|");
	            var status = $.trim(msgs[0]);
	            var info = $.trim(msgs[1]);

                if(status == "ERROR"){
                    if(info == "Email address is invalid"){
                        $('#email').val('').focus();
                    }
                    $("#response").removeClass("success");
                }else{
                	$("#response").addClass("success");
                }
                $("#response").html(info.toUpperCase()).slideDown();
	        }
	    });
	    return false;
	});
	
	//###############################
	// BIGDAY
	//###############################
	var delay = 0;
	function resetBigday(page){
		$('div#section_bigday').scrollIt( {top:0, left:0}, delay, "y", function(){
			$('div#section_bigday').css({'overflow' : 'hidden'});
			setupHome(page, "x");
			$("div#dotted-bigday").show("fast");
			}
		); //BIGDAY
	};
	function setupBigday(){
		homeContent("HIDE");

		$('html, body').scrollIt( {top:0, left:0}, 800, "x", function(){
			$('div#section_bigday').css({'overflow-y' : 'scroll', 'overflow-x' : 'hidden'});
			$('div#footer, div#webfontawards').css({'right' : '16px'});
			$("div#dotted-bigday").hide("slow");
			}
		); //BIGDAY
		completeHover = false;
		setPage("bigday");
	};
	
	//###############################
	// JOURNEY
	//###############################
	function resetJourney(page){
		$('div#section_journey').scrollIt( {top:0, left:0}, 800, "y", setupHome(page, "y") ); //JOURNEY
		$('div#section_journey').css({'overflow' : 'hidden'});
	};
	function setupJourney(){
		homeContent("HIDE");

		$('html, body').scrollIt( {top:journeyPosY, left:journeyPosX}, 800, "y", function(){
			$('div#section_journey').css({'overflow-y' : 'scroll', 'overflow-x' : 'hidden'});
			$('div#footer, div#webfontawards').css({'right' : '16px'});
			}
		); //JOURNEY
		completeHover = false;
		setPage("journey");
	};
	
	//###############################
	// BLOG
	//###############################
	function setupBlog(){
		homeContent("HIDE");

		$('html, body').scrollIt( {top:0, left:blogPosX}, 800, "x" ); //JOURNEY
		completeHover = false;
		setPage("blog");
	};
	
	//###############################
	// BACK HANDS
	//###############################
	$('div#section_bigday a.back_home').click(function() {
	  	resetBigday("home");
	  	return false;
	});
	$('div#section_journey a.back_home').click(function() {
	  	resetJourney("home");
	  	return false;
	});
	$('div#section_blog a.back_home').click(function() {
	  	setupHome("home", "x");
	  	return false;
	});
	
	//###############################
	// BIG DAY NAV
	//###############################
	function setupNav(){
		var scrollY = $("div#section_bigday").scrollTop();
		//$("div#bigday_nav").append(scrollY);
		if(scrollY <= 20){
			//$("div#dotted-bigday").show("slow");
			//$("div#bigday_dottedline").hide("slow");
			delay = 0;
			$("li#subnav_first").show();
			$("li#subnav_back").hide();
		}else{
			//$("div#dotted-bigday").hide("slow");
			//$("div#bigday_dottedline").show("slow");
			delay = 800;
			$("li#subnav_first").hide();
			$("li#subnav_back").show();
		}
		if(scrollY <= 570){
			$("div#bigday_nav").css({'position' : 'absolute', 'top' : '470px'});
		}else{
			$("div#bigday_nav").css({'position' : 'fixed', 'top' : '0px'});
		} 
		      	
        //if(scrollY > 470 && scrollY <= 2000){} //JUST IN CASES
	}
	$("div#section_bigday").scroll(setupNav);
	
	$('li#subnav_back').click(function() { $("div#section_bigday").scrollIt( {top:0, left:0}, 800, "x");	return false; });
	$('li#subnav_maps, a#bigday_intro_maps').click(function() { $("div#section_bigday").scrollIt( {top:870, left:0}, 800, "y");	return false; });
	$('li#subnav_food, a#bigday_intro_food').click(function() { $("div#section_bigday").scrollIt( {top:1890, left:0}, 800, "y");	return false; });
	$('li#subnav_giftlist, a#bigday_intro_giftlist').click(function() { $("div#section_bigday").scrollIt( {top:3450, left:0}, 800, "y");	return false; });
	$('li#subnav_accomodation, a#bigday_intro_accomodation').click(function() { $("div#section_bigday").scrollIt( {top:4530, left:0}, 800, "y");	return false; });
	
	$('li#section_bigday_home').click(function() { resetBigday("home");	return false; });
	$('li#section_bigday_journey').click(function() { resetBigday("journey");	return false; });
	$('li#section_bigday_blog').click(function() { resetBigday("blog");	return false; });
	
});

//###############################
// MASTER WINDOW SCROLL FUNCTION
//###############################
$.fn.scrollIt = function(coords, speed, axis, callback) {

	//console.log(coords.top);
	if(speed === 0){
		window.scrollTo(coords.left, coords.top);
		if(callback) callback();
	}else{
		switch(axis){
			case "x":
			this.stop().animate({scrollLeft:coords.left}, speed, function(){
				if(callback) callback();
			});
			break;

			case "y":
			this.stop().animate({scrollTop:coords.top}, speed, function(){
				if(callback) callback();
			});
			break;

			case "both":
			this.stop().animate({scrollLeft:coords.left}, speed, function(){
				$(this).stop().animate({scrollTop:coords.top}, speed, function(){
					if(callback) callback();
				});
			});
			break;
		}
	}

};