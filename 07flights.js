
// Remember we can only load the DOM once, so use hide/ show

var api_base_url = 'http://comp426.cs.unc.edu:3001/';

$(document).ready(function() {
//set up Login Page
$(".create-account-page").hide();
$(".go-to-login-page").hide();
$(".make-account").hide();
$("#newuser").hide();

$(".go-to-create-account-page").on('click',()=> {
	$("#choose-new-password").remove();
	$("#chosen-new-password").remove();
	$(".reset-password").remove();
	$("#account-error").empty();
	// Hide the login page elements
	$("#login-page").hide();
	$(".go-to-create-account-page").hide();
	$(".login").hide();
	$(".login-title").hide();
	$("#welcome").hide();
	$(".change-password").hide();

	// Show create account page elements
	$(".create-account-page").show();
	$("#choose-username").show();
	$("#choose-password").show();
	$(".go-to-login-page").show();
	$(".make-account").show();
	$(".create-account-title").append("<p>Please fill out the information below.</p>")
	$("#newuser").show();

});

$(".go-to-login-page").on('click',()=> {
	$("#choose-new-password").remove();
	$("#chosen-new-password").remove();
	$(".reset-password").remove();
	$("#account-error").empty();
	$("#account-created").empty();
	$("#account-error").empty();
	$(".create-account-title").empty();
	// Show the login page elements
	$(".change-password").show();
	$("#login-page").show();
	$(".go-to-create-account-page").show();
	$(".login").show();
	$(".login-title").show();
	$("#welcome").show();

	// Hide create account page elements
	$(".create-account-page").hide();
	$("#choose-username").hide();
	$("#choose-password").hide();
	$(".go-to-login-page").hide();
	$(".make-account").hide();
	$("#newuser").hide();

});

// User Creation
$('.make-account').on('click',()=>{
	$("#choose-new-password").remove();
	$("#chosen-new-password").remove();
	$(".reset-password").remove();
	$("#account-error").empty();
	$("#account-created").empty();
	$("#account-error").empty();
		let name = $('#chosen-username').val();
		let pass = $('#chosen-password').val();

		//alert("user: "+name+"pass: "+pass);
	$.ajax(api_base_url+'users',
		{
		type:'POST',
		xhrFields: {withCredentials: true},

		data: { "user": {
				"username":name,
			   		"password":pass
			   	}
			},  
	   success: (response) => {

	   		$("#account-created").append("<b>Success! Your account has been created.</b>")
	   		
	   },
	   error: () => {
	   		$("#account-error").append("<b>That username may be taken or your password is too short (minimum 6 characters).</b>");
	   				   }
			
	});

});

$(".change-password").on('click',()=>{
		$("#account-created").empty();
		$("#account-error").empty();
		$(".login").hide();
		$(".go-to-create-account-page").hide();
		$(".change-password").hide();
		$(".go-to-login-page").show();
		$("#choose-new-password").remove();
		$("#chosen-new-password").remove();
		$(".reset-password").remove();
		$(".buttons-container").append('<button type="button" class="reset-password">Change Password</button>');
		$("#login-page").append('<div class="question" id="choose-new-password"><input id="chosen-new-password" type="text" required/><label>Choose a New Password</label></div>');
	
	$(".reset-password").on('click', ()=>{
		$("#account-created").empty();
		$("#account-error").empty();
		let usr = $("#user").val();
		let old_password = $("#pass").val();
		let new_password = $("#chosen-new-password").val();

		$.ajax(api_base_url+'passwords',
			{
			type:'PUT',
			xhrFields: {withCredentials: true},

			data: { "user": {
					"username":usr,
				   	"old_password":old_password,
				   	"new_password":new_password
				   	}
				},  
		   success: (response) => {

		   		$("#account-created").append("<b>Password sucessfully changed.</b>")
		   		
		   },
		   error: () => {
		   		$("#account-error").append("<b>Error! Password must be at least 6 characters long.</b>");
		   				   }
				
		});
	});
	});

$(".login").on('click',()=>{
	$("#account-error").empty();
	let username = $('#user').val();
	let password = $('#pass').val();

	$.ajax(api_base_url+'sessions',
		{
		type:'POST',
		xhrFields: {withCredentials: true},

		data: { "user": {
				"username":username,
			   	"password":password
			   	}
			},  
	   success: (response) => {
	   		$(".login-body").hide();
	   		$(".account-main-page-title").append("<h1>Welcome, "+username+"!<h1>")

	   		$(".primary-content").css( {
	   			'width':'700',
	   			'height':'700',
	   		
	   		});
	   		
	   		$(".account-main-page").css( {
	   			'width':'700',
	   			'height':'700'
	   		});

	   		
	   		//$(".upper").append("<b>Make an Airline Reservation lol fix this</b><br>");
	   		$(".left-upper").append("<b class='book-flight'>Book a Flight</b>");
	   		$(".right-upper").append("<b>Your Reservations</b>");
	   		$(".left-lower").append("<b>Track a Flight</b>");
	   		$(".right-lower").append("<b></b>");


	   		// SELECT AN AIRLINE:
	   		let browse_airlines_clicked = 0;// Variables to keep track of how many times we've clicked things
	   		let browse_destinations_clicked = 0;
	   		let browse_departures_clicked = 0;

	   		//$(".upper").append("<div class='airline-search-container'><button class='browse-airlines'>Select Airline:</button></div>");
	   		//Find Flights Container Content
	   		$(".left-upper").after("<div class='departure-search-container'><button class='browse-departures'>Select Departure:</button></div>");
	   		$(".left-upper").after("<div class='destination-search-container'><button class='browse-destinations'>Select Destination:</button></div>");
	   		$(".left-upper").after("<div class='find-flights-container'><button class='find-flights'>Find Flights</button></div>");

	   		// SELECT DEPARTURE
	   		$("body").on("click",".browse-departures", function() {
	   			if(browse_departures_clicked == 0) {
		   			browse_departures_clicked = 1;
		   			
		   			$(".browse-departures").after("<div class='departures-dropdown'><input type='text' placeholder='Search Cities'class='input-browse-departures'></input></div>");
		   			
		   			$(".departures-dropdown").append('<div class="departure-list"></div>');
		   			// Get airlines
					$.ajax(api_base_url + 'airports',
						       {
							   type: 'GET',
							   dataType: 'json',
							   xhrFields: {withCredentials: true},
							  
							   success: (response) => {
							      //console.log(response); 

							      let airports = response;
							      for(let j = 0; j<airports.length; j++) {
							      	let airport_id = airports[j].id
							      	$(".departure-list").append("<div class='departure' data-departureid='"+airport_id+"'><p>"+airports[j].city+" ("+airports[j].code+") </p><span class='airport-name'>"+airports[j].name+"</span></div>");

							      }
							      
							   },
							   error: () => {
							       alert('error');
							   }
						       });
					$("body").on("keyup", ".input-browse-departures", function() {
						//filterFunction();
						var value = $(this).val().toLowerCase();

	    				$(".departure").filter(function() {

	      				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    					});
					});
				} else if (browse_departures_clicked == 1) {
					browse_departures_clicked = 2;
					$(".departures-dropdown").hide();
				} else if (browse_departures_clicked == 2) {
					browse_departures_clicked = 1;
					$(".departures-dropdown").show();
				}

				// Click on a place to select it:
				$("body").on("click",".departure", function() {
					let departure_id_num = $(this).attr('data-departureid');
					//alert(departure_id_num);
					$('.selected-departure').remove();
					let departure_name = $(this).text();
					
					$(".browse-departures").before("<p class='selected-departure' data-departureid='"+departure_id_num+"'>"+departure_name.split(' ')[0]+departure_name.split(' ')[1]+"</p>");

				});
				
	   		});

	   		// SELECT DESTINATION

	   		$("body").on("click",".browse-destinations", function() {
	   			if(browse_destinations_clicked == 0) {
		   			browse_destinations_clicked = 1;
		   			
		   			$(".browse-destinations").after("<div class='destinations-dropdown'><input type='text' placeholder='Search Cities'class='input-browse-destinations'></input></div>");
		   			
		   			$(".destinations-dropdown").append('<div class="destination-list"></div>');
		   			// Get airlines
					$.ajax(api_base_url + 'airports',
						       {
							   type: 'GET',
							   dataType: 'json',
							   xhrFields: {withCredentials: true},
							  
							   success: (response) => {
							      //console.log(response); 

							      let airports = response;
							      for(let j = 0; j<airports.length; j++) {
							      	let airport_id = airports[j].id
							      	$(".destination-list").append("<div class='destination' data-destinationid='"+airport_id+"'><p>"+airports[j].city+" ("+airports[j].code+") </p><span class='airport-name'>"+airports[j].name+"</span></div>");
							      	

							      }
							      
							   },
							   error: () => {
							       alert('error');
							   }
						       });
					$("body").on("keyup", ".input-browse-destinations", function() {
						//filterFunction();
						var value = $(this).val().toLowerCase();

	    				$(".destination").filter(function() {

	      				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    					});
					});
				} else if (browse_destinations_clicked == 1) {
					browse_destinations_clicked = 2;
					$(".destinations-dropdown").hide();
				} else if (browse_destinations_clicked == 2) {
					browse_destinations_clicked = 1;
					$(".destinations-dropdown").show();
				}

				// Click on a place to select it:
				$("body").on("click",".destination", function() {

					let destination_id_num = $(this).attr('data-destinationid');
					$('.selected-destination').remove();
					let destination_name = $(this).text();
					
					$(".browse-destinations").before("<p class='selected-destination' data-destinationid = '"+destination_id_num+"'>"+destination_name.split(' ')[0]+destination_name.split(' ')[1]+"</p>");



				});
				
	   		});

	   		$("body").on("click",".find-flights", function() {
	   			//let destination_city_name = $('.selected-destination').text().split('(')[0];

	   		//	console.log($(this).parent().find(".data-destinationid"));

	   			let departure_id = $(".selected-departure").attr('data-departureid');
	   			let destination_id = $(".selected-destination").attr('data-destinationid');


	   			$.ajax(api_base_url + 'flights?filter[departure_id]='+departure_id+'&filter[arrival_id]='+destination_id,
						       {
							   type: 'GET',
							   dataType: 'json',
							   xhrFields: {withCredentials: true},
							  
							   success: (response) => {
							   		//console.log(response);
							   		if(response.length > 0) {

							   			// need to hide everything and just show flight info
							   			$('.account-main-page').children().remove(); 
							   			$('.browse-departures').remove(); 
							      		$('.browse-destinations').remove();
							      		$('.find-flights').remove();

							   			// need to find: airline name, departure city & destination
							   			let num_rows = response.length;
							   			//console.log(response); 
							      	
							      		// clear previous flight table:
							      	//	$(".flight-table").remove(); 
							      	//	$(".find-flights-container").append("<table class='flight-table'><tr><th>Flight Number</th><th>Airline</th><th>Departing From</th><th>Destination</th><th>Departure Time</th><th>Arrival Time</th></tr></table>");
							      		$('.account-main-page').append("<h1>Reserve a Flight</h1>");
							      		$('.account-main-page').append("<button class='home'>Return to home page</button>");
							      		
							      		$('.account-main-page').append("<table class='flight-table'><tr><th>Flight Number</th><th>Airline</th><th>Departing From</th><th>Destination</th><th>Departure Time</th><th>Arrival Time</th></tr></table>");

							      		for(let i = 0; i < num_rows; i++){
							      			let flight_num = response[i].plane_id;
							      			let departure_time = response[i].departs_at.split('T')[1].substring(0,5);
							      			let departure_date = response[i].departs_at.split('T')[0].substring(6,10).replace("-","/");

							      			let arrival_time = response[i].arrives_at.split('T')[1].substring(0,5);
							      			let arrival_date = response[i].arrives_at.split('T')[0].substring(6,10).replace("-","/");

							      			let airline_name = get_airline_by_id(response[i].airline_id);
							      			let departing_from = get_airport_by_id(response[i].departure_id);
							      			let arriving_to = get_airport_by_id(response[i].arrival_id);
							      			//alert(airline_name);

							      		$(".flight-table").append("<tr id='flight' class='flight_"+i+"'></tr>");
							      		$(".flight_"+i).append("<td class='flight-id-num '>"+flight_num+"</td><td>"+airline_name+"</td><td>"+departing_from+"</td><td>"+arriving_to+"</td><td>"+departure_time+" ("+departure_date+")</td><td>"+arrival_time+" ("+arrival_date+")</td>");
							      		$(".flight_"+i).append("<span class='book-this'>Click to reserve</span>");
							      		}

							      	
							      	

							   		} else {
							   			alert("no flights found");
							   		}
				
							      	
							   },
							   error: () => {
							       alert('error');
							   }
						       });

	   		});
	   		
	   },
	   error: () => {
	   		$("#account-error").append("<b>Invalid password or username.</b>");
	   }
			
	});
});


$('body').on('click', '.home', function(){
	showHomePage();  //<- NEED TO FIX THIS FUNCTION 

});
	
let flight_clicked = 0;
let flight_id_number;
$('body').on('click', '#flight', function(){
	//display selected flight info
		//this includes flight ID, airline name, departure time, arrival time
	//allow option to choose the number of tickents 
	plane_id_number = ($(this).find(".flight-id-num").text());

	if(flight_clicked==0) {
		$(this).css( {
		'background-color':'#ddd'
		});
		flight_clicked = 1;

	} else {
		alert("You already selected your flight!")
	}

	if(! $('.account-main-page').children().is('.tickets')){
		//$('.account-main-page').append('<p class="tickets">How many people are flying? (max = 4 tickets)</p>'); 
		//$('.account-main-page').append('<input type="text" class="numTickets"></input>'); 
		$('.account-main-page').append('<button class="find-seats">Find seats for this flight</button><br>'); 
	}	
	//they can only choose up to four
	$('body').on('click', '.find-seats', function(){
		$(".find-seats").remove();
		let numTickets = $('.numTickets').val(); 

	//for(let i =0; i< numTickets; i++){
		//four rows with Ticket 1 and button to select seat 
	//}	
		$('.account-main-page').append('<div class="select-ticket"></div>');

		$('.select-ticket').append('<div class="select-cabin"><p class="select-prompt">Cabin: <select class="options"></select></p></div>');
		$('.options').append('<option value="0">Budget</option>');
		$('.options').append('<option value="1">Economy</option>');
		$('.options').append('<option value="3">Business</option>');
		$('.options').append('<option value="4">Premium</option>');
		$('.options').append('<option value="5">First</option>');

		$('.select-ticket').append('<div class="select-seat-type"><p class="select-prompt">Seat Letter: <select class="seat-type-options"></select></p></div>');
		
		
		$('.seat-type-options').append('<option value="0">A</option>');
		$('.seat-type-options').append('<option value="1">B</option>');
		$('.seat-type-options').append('<option value="2">C</option>');
		$('.seat-type-options').append('<option value="3">D</option>');
		$('.seat-type-options').append('<option value="4">E</option>');
		$('.seat-type-options').append('<option value="5">F</option>');

		$('.select-ticket').append('<div class="select-seat-type"><p class="select-prompt">Seat Row: <select class="seat-row-options"></select></p></div>');
		$('.select-ticket').append('<div class="select-seat-type"><br><p class="select-prompt"><button class="get-ticket">Get ticket</button></p></div>');
		
		for(let i = 1; i<=22; i++) {
			$('.seat-row-options').append('<option value="5">'+i+'</option>');
		}



		$.ajax(api_base_url + 'planes',	       {
		   	type: 'GET',
		   	dataType: 'json',
		   	xhrFields: {withCredentials: true},
		  
		   	success: (response) => {
		   		for (let i = 0; i<response.length; i++){
		   			if(response[i].id == plane_id_number) {
		   				console.log(response[i]);
		   				$(".primary-content").css({
		   					'height':'900'
		   				})
		   				$(".select-ticket").append('<div class="plane-image"><img class="seat-chart" src="'+response[i].seatmap_url+'"></div>');
		   			}
		   		}
		   	
		   },

	       });
	$('body').on('click', '.get-ticket', function(){
		let cabin = $('.options :selected').text();
		let seat_type = $('.seat-type-options :selected').text();
		let seat_row = $('.seat-row-options :selected').text();

		$('.select-ticket').append('<div class="ticket-title"><p class="select-prompt">Your Ticket(s):</p></div>');
		alert("flight id "+plane_id_number+" row: "+seat_row+" type: "+seat_type+" cabin: "+ cabin);
		// create seat:
		$.ajax(api_base_url + 'seats',	       {
		   	type: 'POST',
		   	dataType: 'json',
		   	xhrFields: {withCredentials: true},
		   	data: {
		  		"seat": {
		  			"plane_id":plane_id_number,
		  			"row": seat_row,
		  			"number": seat_type,
		  			"cabin":cabin
		  			//"is_window":true
		  			}
		  	},
		   	success: (response) => {
		   		
		   	//	put another div with a little table and you can add more tickets to it. 
		   	//	later put in checks to make sure you cant put same ticket twice, etc.
		     
		   },

	       });


			$.ajax(api_base_url + 'seats?filter[plane_id]='+plane_id_number,	       {
		   	type: 'GET',
		   	dataType: 'json',
		   	xhrFields: {withCredentials: true},
		   
		   	success: (response) => {
		   		console.log(response);
		   		
		     
		   },

	       });



	});

		$('body').on('click', '.numTickets', function(){ /// TBD WHAT CLICK ON TO GET HERE
			alert(plane_id_number); // still works

			let selected_cabin = $('.options :selected').text();
			let selected_seat_type = $('.seat-type-options :selected').text();
			let has_window = false;
			let is_aisle = false;

			if(selected_seat_type == 'Window') {
				has_window = true;
				is_aisle = false;
			} else if(selected_seat_type == 'Aisle') {
				is_aisle = true;
				has_window = false;
			}
			//alert(api_base_url + 'seats?filter[cabin]='+selected_cabin+'&filter[is_window]='+is_window+'&filter[is_aisle]='+is_aisle);
			//?filter[cabin]='+selected_cabin,+'&filter[is_window]='+is_window+'&filter[is_aisle]='+is_aisle
			//alert(api_base_url + 'seats?filter[plane_id]='+plane_id_number);

			// need to filter by plane ID 
			//$.ajax(api_base_url + 'seats?filter[plane_id]='+plane_id_number,	       {
			$.ajax(api_base_url + 'planes',	       {
		   	type: 'GET',
		   	dataType: 'json',
		   	xhrFields: {withCredentials: true},
		  
		   	success: (response) => {
		   		//console.log(response);
		   		//alert(selected_cabin);
		   		//alert(response[1].cabin);
		   		//if(selected_cabin == response[1].cabin) {
		   		//	alert("equal yay");
		   		//}

		   		//for(let i = 0; i<response.length; i++) {

		   		//	if((response[i].is_window == has_window)) {
		   		//		if((response[i].cabin == selected_cabin)) {
		   		//			alert(response[i]);
		   		//		}
		   				//console.log(response[i]);
		   		//	}
		   	 	//	if((response[i].cabin == selected_cabin)&&(response[i].is_window == has_window)) {
		   	 	
		   	 		//	console.log(response[i]);
		   	 	//	}
		   	 	//	}
		     
		     
		      
		   },

	       });
		}); // click
	}); 
});




//function to set up page once logged in



}); // Document ready function don't remove

// functions:

function showHomePage(){
	//FIX THIS GIRL 
			$('.account-main-page').children().remove();
			$(".left-upper").append("<b class='book-flight'>Book a Flight</b>");
	   		$(".right-upper").append("<b>Your Reservations</b>");
	   		$(".left-lower").append("<b>Track a Flight</b>");
	   		$(".right-lower").append("<b></b>");


	   		//$(".upper").append("<div class='airline-search-container'><button class='browse-airlines'>Select Airline:</button></div>");
	   		//Find Flights Container Content
	   		$(".left-upper").after("<div class='departure-search-container'><button class='browse-departures'>Select Departure:</button></div>");
	   		$(".left-upper").after("<div class='destination-search-container'><button class='browse-destinations'>Select Destination:</button></div>");
	   		$(".left-upper").after("<div class='find-flights-container'><button class='find-flights'>Find Flights</button></div>");
}

function get_airline_by_id(id_number) {
	let name;
	$.ajax(api_base_url + 'airlines',
       {
       async: false,
	   type: 'GET',
	   dataType: 'json',
	   xhrFields: {withCredentials: true},
	  
	   success: (response) => {
	     //alert(response[0].id);
	     for(let i = 0; i<response.length; i++) {
	     	if(response[i].id == id_number) {
	     		name = response[i].name;
	     		
	     	}
	     }   
	      
	   },

       });
	
	return name;
}

function get_airport_by_id(id_number) {
	let name;
	$.ajax(api_base_url + 'airports',
       {
       async: false,
	   type: 'GET',
	   dataType: 'json',
	   xhrFields: {withCredentials: true},
	  
	   success: (response) => {
	     //alert(response[0].id);
	     for(let i = 0; i<response.length; i++) {
	     	if(response[i].id == id_number) {
	     		name = response[i].city;
	     		name += ' ('+response[i].code+')';
	     		
	     	}
	     }
	  
	      
	   },
	   error: (response) => {
	   	alert("couldn't get airport by the ID"); 
	   }

       });
	
	return name;
}	

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}