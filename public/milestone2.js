
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

  function verifyRegistration() {

    if(empty(escapeHtml(document.querySelector('#fname').value))){
      fname_err = "Please enter a First Name.";
      document.querySelector('#fname_err').innerHTML = fname_err;
    } else {
      fname = escapeHtml(document.querySelector('#fname').value);
      document.querySelector('#fname_err').innerHTML = fname;
    }

    if(empty(escapeHtml(document.querySelector('#lname').value))){
      lname_err = "Please enter a Last Name.";
      document.querySelector('#lname_err').innerHTML = lname_err;
    } else {
      lname = escapeHtml(document.querySelector('#lname').value);
      document.querySelector('#lname_err').innerHTML = lname;
    }

    if(empty(escapeHtml(document.querySelector('#email').value))){
      email_err = "Please enter a email.";
      document.querySelector('#email_err').innerHTML = email_err;
    } else {
      email = escapeHtml(document.querySelector('#email').value);
      document.querySelector('#email_err').innerHTML = email;
    }

    if(empty(escapeHtml(document.querySelector('#username').value))){
      username_err = "Please enter a username.";
      document.querySelector('#username_err').innerHTML = username_err;
    } else {
      username = escapeHtml(document.querySelector('#username').value);
      document.querySelector('#username_err').innerHTML = username;
    }

    if(empty(escapeHtml(document.querySelector('#password').value))){
      password_err = "Please enter a password.";
      document.querySelector('#password_err').innerHTML = password_err;
    } else {
      password = escapeHtml(document.querySelector('#password').value);
      //document.querySelector('#password_err').innerHTML = password;
    }

    if(empty(escapeHtml(document.querySelector('#confirm_password').value))){
      confirm_password_err = "Please confirm password.";
      document.querySelector('#confirm_password_err').innerHTML = confirm_password_err;
    } else {
      confirm_password = escapeHtml(document.querySelector('#confirm_password').value);
      document.querySelector('#confirm_password_err').innerHTML = confirm_password;

      if(empty(password_err) && (password != confirm_password)){
        confirm_password_err = "Password did not match.";
        document.querySelector('#confirm_password_err').innerHTML = confirm_password_err;
      }
    }

  }