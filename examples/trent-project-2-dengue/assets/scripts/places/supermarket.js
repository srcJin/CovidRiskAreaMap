let supermarkets = document
  .querySelector(".spmkt")
  .addEventListener("click", () => {
    getSupermarkets();
  });

function getSupermarkets() {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=1.3497222222,103.9544444444&radius=4000&type=grocery_or_supermarket&key=AIzaSyAQOzXrUwtwRVkzSyWzeRdxfpiPe7kBliU",
    true
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      loadSupermarketMarkers(response);
      loadSupermarketTable(response);
    } else {
      alert(
        "I'm sorry, there are too many requests to Heroku's servers. \nPlease try again in a second."
      );
    }
  };

  xhr.send();
}

function loadSupermarketMarkers(googleData) {
  let tampines = { lat: 1.3497222222, lng: 103.9544444444 };
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: tampines
  });
  let googleObject = Object.entries(googleData)[2][1];
  for (let i = 0; i < googleObject.length; i++) {
    let markerPath = "http://maps.google.com/mapfiles/marker";
    let markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
    let markerIcon = markerPath + markerLetter + ".png";
    let listOfObjects = googleObject[i];
    let marker = new google.maps.Marker({
      position: listOfObjects["geometry"]["location"],
      map: map,
      icon: markerIcon,
      animation: google.maps.Animation.DROP
    });

    let display = {};
    display.name = listOfObjects.name;
    display.rating = listOfObjects.rating;
    display.vicinity = listOfObjects.vicinity;

    if (display["name"] === undefined) {
      display["name"] = "No Available Name";
    } else {
      display["name"] = display["name"];
    }

    if (display["rating"] === undefined) {
      display["rating"] = "No Available Rating";
    } else {
      display["vicinity"] = display["vicinity"];
    }

    if (display["vicinity"] === undefined) {
      display["vicinity"] = "No Available Address";
    } else {
      display["vicinity"] = display["vicinity"];
    }

    let tableHeadIcon = '<i class="fas fa-shopping-cart"></i>';

    marker.info = new google.maps.InfoWindow({
      content: `<h5 class="infoWindow-header">${tableHeadIcon} ${display.name}</h5>
      <br>
    <p class="infoWindow-content">Address: ${display.vicinity}</p>
    <p class="infoWindow-content">Rating: ${display.rating}</p>`
    });

    let w = window.innerWidth;
    if (w < 768) {
      google.maps.event.addListener(marker, "click", function () {
        marker.info.open(map, marker);
      });
    } else if (w >= 768) {
      google.maps.event.addListener(marker, "mouseover", function () {
        marker.info.open(map, marker);
      });
      google.maps.event.addListener(marker, "mouseout", function () {
        marker.info.close(map, marker);
      });
    }
  }
}

function loadSupermarketTable(googleData) {
  let resultsTable = document.querySelector(".results-table");
  let googleObject = Object.entries(googleData);
  let googleResult = googleObject[2][1];
  let tableRow = "";
  let tableHead = `<thead>
    <tr class="table-header">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
    </tr>
  </thead>`;
  let status = googleObject[3][1];

  if (status === "OK") {
    for (let i = 0; i < googleResult.length; i++) {
      let markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
      let tableList = googleResult[i];

      tableRow += `<tr>
              <th scope="row">${markerLetter}</th>
              <td>${tableList["name"]}</td>
              <td>${tableList["vicinity"]}</td>
            </tr>
          `;
      resultsTable.innerHTML = `<table class="table-sm">
          ${tableHead}<tbody>${tableRow}</tbody>
          </table>`;
    }
  } else {
    resultsTable.innerHTML = `There is no data available`;
    alert("There was an error with data retrieval because: " + status);
  }
}
