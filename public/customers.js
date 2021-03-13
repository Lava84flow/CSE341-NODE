function getAddresses(customerId) {
  let classIdURL =
    "/getAddresses?id=" + customerId;
  fetch(classIdURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
        document.getElementById("output").innerHTML = "NO RESULTS";
      } else {
		let out = JSON.stringify(jsObject);
        /*console.log(out);*/
        document.getElementById("output").innerHTML = out;
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
        document.getElementById("output").innerHTML = "NO RESULTS";
      } else {
		let out = JSON.stringify(jsObject);
        /*console.log(out);*/
        document.getElementById("output").innerHTML = out;
      }
    });
}