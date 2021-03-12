function getPerson(personId) {
  let classIdURL =
    "/getPerson?id=" + personId;
  fetch(classIdURL)
    .then((response) => response.json())
    .then((jsObject) => {
      if (jsObject.length == 0) {
        console.log("NO RESULTS");
      } else {
		let out = JSON.stringify(jsObject);
        console.log(out);
        document.getElementById("output").innerHTML = out;
      }
    });
}