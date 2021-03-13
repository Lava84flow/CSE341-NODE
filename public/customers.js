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
        let data = JSON.parse(jsObject)
        console.log(data)
		    let out = data;
          /*console.log(out);*/
          document.getElementById("output").innerHTML = out;
      }
    });
}

/*
<table style="width:100%">
  <tr>
    <th>Address Type</th>
    <th>Line 1</th>
    <th>Line 2</th>
    <th>City</th>
    <th>State</th>
    <th>Zipcode</th>
    <th>Delete Address</th>
  </tr>

*/

/*<tr><td>$type</td> <td>$address_line1</td> <td>$address_line2</td> <td>$city</td> <td>$state</td> <td>$zipcode</td> <td><a href=\"delete-address.php?ID=$address_id\">Delete</a></td></tr>*/

/*</table>*/

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

/*
<table style="width:100%">
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Subtotal</th>
    <th>Taxes</th>
    <th>Shipping</th>
    <th>Status</th>
    <th>Shipping Address</th>
    <th>Billing Address</th>
  </tr>
*/

/*<tr><td>$fname</td> <td>$lname</td> <td>$subtotal</td> <td>$taxes</td> <td>$shipping</td> <td>$status</td> <td>$shippinga</td> <td>$billinga</td></tr>*/

/*</table>*/