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