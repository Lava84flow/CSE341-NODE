//const { Router } = require("express");

var username, password, confirm_password, fname, lname, email;
username = password = confirm_password = fname = lname = email = "";

var username_err, password_err, confirm_password_err, fname_err, lname_err, email_err;
username_err = password_err = confirm_password_err = fname_err = lname_err = email_err = "";

var shopping_cart = [];
var price_total = [];

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

function loadAddAdresses() {
  fetch('/add-addresses.html')
    .then((response) => {
      return response.text();
    })
    .then((myContent) => {
      document.querySelector('#content').innerHTML = myContent;
    });
}

async function loadStore() {
  await fetch('/store-main.html')
    .then((response) => {
      return response.text();
    })
    .then((myContent) => {
      document.querySelector('#content').innerHTML = myContent;
    });

  await getProducts();

}

async function loadShoppingCart () {
  await fetch('/shoppingcart.html')
    .then((response) => {
      return response.text();
    })
    .then((myContent) => {
      document.querySelector('#content').innerHTML = myContent;
      await FillCart();
    });

}

async function FillCart() {

  var x = '';

  for (i = 0; i < shopping_cart.length; i++) {
    var img_src = await getProduct(shopping_cart[i]);

    console.log(img_src);

    x += `<div class="store-item"><img class="thumb" src="${img_src}">
    <div class="centered-button">
        <button type="submit" name="RemoveCart" value="${i}" onclick="removeFromCart(this.value)">Delete From Cart</button>
    </div></div>`;

    let out = x;

          //console.log(out);
          document.getElementById("cart-output").innerHTML = out;
  }
}

async function getProduct(productID) {

  var img_url = '';

  let classIdURL =
    "/getProduct?id=" + productID;
  await fetch(classIdURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
        document.getElementById("cart-output").innerHTML = "NO RESULTS";
      } else {
        let data = jsObject;

        img_url = data[0].img_url
        console.log(img_url);

      }

    });

    return img_url;
}

async function getProducts() {
  let productsURL =
    "/getProducts";
  await fetch(productsURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
        document.getElementById("store-output").innerHTML = "NO RESULTS";
      } else {
        var x = '';
        let data = jsObject;
        //console.log(data);
        for (i = 0; i < data.length; i++) {
          x += `<div class="store-item">
                  <h3>${data[i].title}</h3>
                  <span><strong>${data[i].price}</strong></span>
                  <br />
                  <span>${data[i].media_name}, ${data[i].dimensions} inches</span>
                  <br />
                  <span>${data[i].description}</span>
                  
                  <img class="thumb" src="${data[i].img_url}">
                  
                  <div class="centered-button">
                    <button type="submit" name="AddCart" value="${data[i].idproducts}" onclick="AddCart(this.value, '${data[i].price}')">Add To Cart</button>
                  </div>
                    
                </div>`;
        }
		    let out = x;

          //console.log(out);
          document.getElementById("store-output").innerHTML = out;
      }
    });
}



function AddCart (productID, price) {
  
  productID = parseInt(productID);
  shopping_cart.push(productID);

  price = price.substring(1);
  price = parseInt(price);
  
  price_total.push(price);

  //console.log(shopping_cart);
  //console.log(price_total);
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

async function validateAddAddresses () {

  var line1, line2, city, state, zipcode, address_type;
  line1 = line2 = city = state = zipcode = address_type = "";

  var line1_err, line2_err, city_err, state_err, zipcode_err, address_type_err;
  line1_err = line2_err = city_err = state_err = zipcode_err = address_type_err = "";

  if(empty(escapeHtml(document.querySelector('#line1').value))){
    line1_err = "Please fill out this line";
    document.querySelector('#line1_err').innerHTML = line1_err;
  } else {
    line1_err = '';
    line1 = escapeHtml(document.querySelector('#line1').value);
    document.querySelector('#line1_err').innerHTML = '';
  }

  line2 = escapeHtml(document.querySelector('#line2').value);

  if(empty(escapeHtml(document.querySelector('#city').value))){
    city_err = "Please enter a City";
    document.querySelector('#city_err').innerHTML = city_err;
  } else {
    city_err = '';
    city = escapeHtml(document.querySelector('#city').value);
    document.querySelector('#city_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#state').value))){
    state_err = "Please enter a First Name.";
    document.querySelector('#state_err').innerHTML = state_err;
  } else if (escapeHtml(document.querySelector('#state').value).length != 2) {
    state_err = "State code must be used";
    document.querySelector('#state_err').innerHTML = state_err;
  } else {  
    state_err = '';
    state = escapeHtml(document.querySelector('#state').value);
    document.querySelector('#state_err').innerHTML = '';
  }

  if(empty(escapeHtml(document.querySelector('#zipcode').value))){
    zipcode_err = "Please enter a Zipcode";
    document.querySelector('#zipcode_err').innerHTML = zipcode_err;
  } else if (escapeHtml(document.querySelector('#zipcode').value).length != 5) {
    zipcode_err = "Zipcode must be 5 digits";
    document.querySelector('#zipcode_err').innerHTML = zipcode_err;
  } else {
    zipcode_err = '';
    zipcode = escapeHtml(document.querySelector('#zipcode').value);
    document.querySelector('#zipcode_err').innerHTML = '';
  }

  address_type = escapeHtml(document.querySelector('#address_type').value);
  

  if(empty(line1_err) && empty(line2_err) && empty(city_err) && empty(state_err) && empty(zipcode_err) && empty(address_type_err)) {
    
      var param_line1 = line1;
      
      if(!empty(line2)) {
          var param_line2 = line2;
      } else {
          param_line2 = null;
      }        
      
      var param_city = city;
      var param_state = state;
      var param_zipcode = zipcode;
      var param_type = address_type;

    var params = {
      line1: param_line1,
      line2: param_line2,
      city: param_city,
      state: param_state,
      zipcode: param_zipcode,
      type: param_type
    };

    $.post("/save-address", params, function(result) {
      if (result && result.success) {
        $("#status").text("Successfully saved address");
      } else {
        $("#status").text("Error saving address");
      }
    });
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

  if(empty(password_err) && empty(confirm_password_err)) {
    resetPassword()
  }  

}

function resetPassword () {
  var params = {
		password: password
	};

  $.post("/reset-password", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully reset password");
		} else {
			$("#status").text("Error resetting password");
		}
	});
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