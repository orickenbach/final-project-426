
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
	   		alert("you are logged in");
	   		// do logged in stuff here
	   		
	   },
	   error: () => {
	   		$("#account-error").append("<b>Invalid password or username.</b>");
	   }
			
	});
});


});
