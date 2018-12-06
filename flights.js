

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
	   			'width':'1000',
	   			'height':'700'
	   		});
	   		
	   		$(".account-main-page").css( {
	   			'width':'1000',
	   			'height':'700'
	   		});

	   		

	   		//$(".upper").append("<b>Make an Airline Reservation lol fix this</b><br>");
	   		$(".right-upper").append("<b>Your Reservations:</b>");
	   		$(".left-lower").append("<b>Track a Flight</b>");
	   		$(".right-lower").append("<b></b>");



	   		// SELECT AN AIRLINE:
	   		let browse_airlines_clicked = 0;// Variables to keep track of how many times we've clicked things
	   		let browse_destinations_clicked = 0;
	   		let browse_departures_clicked = 0;

	   		//$(".upper").append("<div class='airline-search-container'><button class='browse-airlines'>Select Airline:</button></div>");
	   		$(".upper").append("<div class='departure-search-container'><button class='browse-departures'>Select Departure:</button></div>");
	   		$(".upper").append("<div class='destination-search-container'><button class='browse-destinations'>Select Destination:</button></div>");
	   		$(".upper").append("<div class='find-flights-container'><button class='find-flights'>Find Flights</button></div>");

	   		
	   // 		$("body").on("click",".browse-airlines", function() {
	   // 			if(browse_airlines_clicked == 0) {
		  //  			browse_airlines_clicked = 1;
		   			
		  //  			$(".browse-airlines").after("<div class='dropdown'><input type='text' placeholder='Search Airlines'class='input-browse-airlines'></input></div>");
		   			
		  //  			$(".dropdown").append('<div class="airline-list"></div>');
		  //  			// Get airlines
				// 	$.ajax(api_base_url + 'airlines',
				// 		       {
				// 			   type: 'GET',
				// 			   dataType: 'json',
				// 			   xhrFields: {withCredentials: true},
							  
				// 			   success: (response) => {
				// 			     // console.log(response); 
				// 			      let airlines = response;
				// 			      for(let i = 0; i<airlines.length; i++) {
				// 			      	$(".airline-list").append("<p class='airline'>"+airlines[i].name+"</p>");
				// 			      }
							      
				// 			   },
				// 			   error: () => {
				// 			       alert('error');
				// 			   }
				// 		       });
				// 	$("body").on("keyup", ".input-browse-airlines", function() {
				// 		//filterFunction();
				// 		var value = $(this).val().toLowerCase();

	   //  				$(".airline").filter(function() {

	   //    				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	   //  					});
				// 	});
				// } else if (browse_airlines_clicked == 1) {
				// 	browse_airlines_clicked = 2;
				// 	$(".dropdown").hide();
				// } else if (browse_airlines_clicked == 2) {
				// 	browse_airlines_clicked = 1;
				// 	$(".dropdown").show();
				// }

				// // Click on an airline to select it:
				// $("body").on("click",".airline", function() {
				// 	$('.selected-airline').remove();
				// 	let airline_name = $(this).text();
				// 	$(".browse-airlines").before("<p class='selected-airline'>"+airline_name+"</p>");
				// });

	   // 		});

	   		
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
							   		if(response.length > 0) {

							   			// need to find: airline name, departure city & destination
							   			let num_rows = response.length;
							   			//console.log(response); 
							      	
							      		// clear previous flight table:
							      		$(".flight-table").remove();
							      		$(".find-flights-container").append("<table class='flight-table'><tr><th>Flight Number</th><th>Airline</th><th>Departing From</th><th>Destination</th><th>Departure Time</th><th>Arrival Time</th></tr></table>");
							      		for(let i = 0; i < num_rows; i++){
							      			let flight_num = response[i].number;
							      			let departure_time = response[i].departs_at.split('T')[1].substring(0,5);
							      			let departure_date = response[i].departs_at.split('T')[0].substring(6,10).replace("-","/");

							      			let arrival_time = response[i].arrives_at.split('T')[1].substring(0,5);
							      			let arrival_date = response[i].arrives_at.split('T')[0].substring(6,10).replace("-","/");

							      			let airline_name = get_airline_by_id(response[i].airline_id);
							      			let departing_from = get_airport_by_id(response[i].departure_id);
							      			let arriving_to = get_airport_by_id(response[i].arrival_id);
							      			//alert(airline_name);

							      			$(".flight-table").append("<tr class='flight_"+i+"'></tr>");
							      			$(".flight_"+i).append("<td>"+flight_num+"</td><td>"+airline_name+"</td><td>"+departing_from+"</td><td>"+arriving_to+"</td><td>"+departure_time+" ("+departure_date+")</td><td>"+arrival_time+" ("+arrival_date+")</td>");

							      			
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

//function to set up page once logged in



}); // Document ready function don't remove

// functions:

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

       });
	
	return name;
}	

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
