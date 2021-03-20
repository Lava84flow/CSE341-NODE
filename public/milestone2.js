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
          var x = '';
          let data = jsObject;
          //console.log(data);
          for (i = 0; i < data.length; i++) {
            x += '<tr> <td>' + data[i].address_type + '</td> <td>' + data[i].address_line1 + '</td> <td>' + data[i].address_line2 + '</td> <td>' + data[i].city + '</td> <td>' + data[i].state + '</td> <td>' + data[i].zipcode + '</td> </tr>';
          }
              let out = '<table style="width: 100%; color: black;"> <tr> <th>Address Type</th> <th>Line 1</th> <th>Line 2</th> <th>City</th> <th>State</th> <th>Zipcode</th> </tr>' + x + '</table>';
  
            //console.log(out);
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
          var x = '';
          let data = jsObject;
          //console.log(data);
          for (i = 0; i < data.length; i++) {
            x += '<tr> <td>' + data[i].first_name + '</td> <td>' + data[i].last_name + '</td> <td>' + data[i].subtotal + '</td> <td>' + data[i].taxes + '</td> <td>' + data[i].shipping + '</td> <td>' + data[i].status + '</td> <td>' + data[i].shipping_address + '</td> <td>' + data[i].billing_address + '</td> </tr>';
          }
              let out = '<table style="width: 100%; color: black;"> <tr> <th>First Name</th> <th>Last Name</th> <th>Subtotal</th> <th>Taxes</th> <th>Shipping</th> <th>Status</th> <th>Shipping Address</th> <th>Billing Address</th> </tr>' + x + '</table>';
  
            //console.log(out);
            document.getElementById("output").innerHTML = out;
        }
      });
  }