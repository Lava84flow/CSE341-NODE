//const { Router } = require("express");

var username, password, confirm_password, fname, lname, email;
username = password = confirm_password = fname = lname = email = "";

var username_err, password_err, confirm_password_err, fname_err, lname_err, email_err;
username_err = password_err = confirm_password_err = fname_err = lname_err = email_err = "";

function escapeHtml(str)
{
    var map =
    {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function(m) {return map[m];});
}

function empty(data)
{
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  { 
    return false; 
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true; 
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}


function loadLogin() {
    fetch('/login.html')
      .then((response) => {
        return response.text();
      })
      .then((myContent) => {
        document.querySelector('#content').innerHTML = myContent;
      });
  }


function loadRegister() {
  fetch('/register.html')
    .then((response) => {
      return response.text();
    })
    .then((myContent) => {
      document.querySelector('#content').innerHTML = myContent;
    });
}

async function validateRegistration() {

  if(empty(escapeHtml(document.querySelector('#fname').value))){
    fname_err = "Please enter a First Name.";
    document.querySelector('#fname_err').innerHTML = fname_err;
  } else {
    fname_err = '';
    fname = escapeHtml(document.querySelector('#fname').value);
    document.querySelector('#fname_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#lname').value))){
    lname_err = "Please enter a Last Name.";
    document.querySelector('#lname_err').innerHTML = lname_err;
  } else {
    lname_err = '';
    lname = escapeHtml(document.querySelector('#lname').value);
    document.querySelector('#lname_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#email').value))){
    email_err = "Please enter a email.";
    document.querySelector('#email_err').innerHTML = email_err;
  } else {

    var emails = await checkEmails(escapeHtml(document.querySelector('#email').value));

    if (emails == false) {
      email_err = '';
      email = escapeHtml(document.querySelector('#email').value);
      document.querySelector('#email_err').innerHTML = '';
    } else {
      email_err = "This email is already taken.";
      document.querySelector('#email_err').innerHTML = email_err;
    }
/*
    email_err = '';
    email = escapeHtml(document.querySelector('#email').value);
    document.querySelector('#email_err').innerHTML = '';
    */
  }

  if(empty(escapeHtml(document.querySelector('#username').value))){
    username_err = "Please enter a username.";
    document.querySelector('#username_err').innerHTML = username_err;
  } else {

    var users = await checkUsers(escapeHtml(document.querySelector('#username').value));

    if (users == false) {
      username_err = '';
      username = escapeHtml(document.querySelector('#username').value);
      document.querySelector('#username_err').innerHTML = '';
    } else {
      username_err = "This username is already taken.";
      document.querySelector('#username_err').innerHTML = username_err;
    }
  }

  if(empty(escapeHtml(document.querySelector('#password').value))){
    password_err = "Please enter a password.";
    document.querySelector('#password_err').innerHTML = password_err;
  } else {
    password_err = '';
    password = escapeHtml(document.querySelector('#password').value);
    document.querySelector('#password_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#confirm_password').value))){
    confirm_password_err = "Please confirm password.";
    document.querySelector('#confirm_password_err').innerHTML = confirm_password_err;
  } else {
    confirm_password_err = '';
    confirm_password = escapeHtml(document.querySelector('#confirm_password').value);
    document.querySelector('#confirm_password_err').innerHTML = '';

    if(empty(password_err) && (password != confirm_password)){
      confirm_password_err = "Password did not match.";
      document.querySelector('#confirm_password_err').innerHTML = confirm_password_err;
    } else {
      confirm_password_err = '';
      document.querySelector('#confirm_password_err').innerHTML = '';
    }
  }

  if(empty(username_err) && empty(password_err) && empty(confirm_password_err) && empty(fname_err) && empty(lname_err) && empty(email_err)){
    saveCustomerToDB();
  }

}

async function validateLogin() {

  if(empty(escapeHtml(document.querySelector('#username').value))){
    username_err = "Please enter a username.";
    document.querySelector('#username_err').innerHTML = username_err;
  } else {
    username_err = '';
    username = escapeHtml(document.querySelector('#username').value);
    document.querySelector('#username_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#password').value))){
    password_err = "Please enter a password.";
    document.querySelector('#password_err').innerHTML = password_err;
  } else {
    password_err = '';
    password = escapeHtml(document.querySelector('#password').value);
    document.querySelector('#password_err').innerHTML = '';
  }

  if(empty(username_err) && empty(password_err)) {
    login()
  }  

}

function login() {

	var params = {
		username: username,
		password: password
	};

	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged in.");
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

async function validateResetPassword() {

  if(empty(escapeHtml(document.querySelector('#new_password').value))){
    password_err = "Please enter the new password";
    document.querySelector('#new_password_err').innerHTML = username_err;
  } else {
    password_err = '';
    password = escapeHtml(document.querySelector('#new_password').value);
    document.querySelector('#new_password_err').innerHTML = '';
  }

  if(empty(password_err) && (password != confirm_password)){
    confirm_password_err = "Please confirm the password";
    document.querySelector('#confirm_password_err').innerHTML = confirm_password_err;
  } else {
    confirm_password_err = '';
    document.querySelector('#confirm_password_err').innerHTML = '';
  }

  if(empty(password_err) && empty(confirm_password_err)) {
    //resetPassword()
  }  

}

function resetPassword () {
  var params = {
		password: password
	};
}


function saveCustomerToDB () {

  var params = {
    first_name: fname,
    last_name: lname,
    email: email,
		username: username,
		password: password
	};

  //console.log(params)

	$.post("/saveCustomer", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully Registered");
		} else {
			$("#status").text("Error Registering");
		}
	});
}




async function checkEmails(email) {
  let classIdURL =
    "/getEmails?email=" + email;
  await fetch(classIdURL)
    .then((response ) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        //console.log("NO RESULTS");
        return results = false;
      } else {
        return results = true;
      }
    });
  return results;
}

async function checkUsers(user) {
  let classIdURL =
    "/getUsers?username=" + user;
  await fetch(classIdURL)
    .then((response ) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        //console.log("NO RESULTS");
        return results = false;
      } else {
        return results = true;
      }
    });
  return results;
}

function getAddresses(customerId) {
  let classIdURL =
    "/getAddresses?id=" + customerId;
  fetch(classIdURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
        document.getElementById("address-output").innerHTML = "NO RESULTS";
      } else {
        var x = '';
        let data = jsObject;
        //console.log(data);
        for (i = 0; i < data.length; i++) {
          x += '<tr> <td>' + data[i].address_type + '</td> <td>' + data[i].address_line1 + '</td> <td>' + data[i].address_line2 + '</td> <td>' + data[i].city + '</td> <td>' + data[i].state + '</td> <td>' + data[i].zipcode + '</td> </tr>';
        }
		    let out = '<table style="width: 100%;"> <tr> <th>Address Type</th> <th>Line 1</th> <th>Line 2</th> <th>City</th> <th>State</th> <th>Zipcode</th> </tr>' + x + '</table>';

          //console.log(out);
          document.getElementById("address-output").innerHTML = out;
      }
    });
}

function getOrders(customerId) {
  let classIdURL =
    "/getOrders?id=" + customerId;
  fetch(classIdURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
        document.getElementById("order-output").innerHTML = "NO RESULTS";
      } else {
        var x = '';
        let data = jsObject;
        //console.log(data);
        for (i = 0; i < data.length; i++) {
          x += '<tr> <td>' + data[i].first_name + '</td> <td>' + data[i].last_name + '</td> <td>' + data[i].subtotal + '</td> <td>' + data[i].taxes + '</td> <td>' + data[i].shipping + '</td> <td>' + data[i].status + '</td> <td>' + data[i].shipping_address + '</td> <td>' + data[i].billing_address + '</td> </tr>';
        }
		    let out = '<table style="width: 100%;"> <tr> <th>First Name</th> <th>Last Name</th> <th>Subtotal</th> <th>Taxes</th> <th>Shipping</th> <th>Status</th> <th>Shipping Address</th> <th>Billing Address</th> </tr>' + x + '</table>';

          //console.log(out);
          document.getElementById("order-output").innerHTML = out;
      }
    });
}