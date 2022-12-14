function initMap() {
    const centerPoint = [1.3521, 103.8198];
    const map = L.map("map");
    map.setView(centerPoint, 14);

    // create the tile layer
    const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    });
    tileLayer.addTo(map);
    return map;
}

function displaySearchResults(results, resultLayer, map){
    
    for (let r of results) {
        const lat = r.geocodes.main.latitude;
        const lng = r.geocodes.main.longitude;
        const marker = L.marker([lat,lng]);
        marker.addTo(resultLayer);
        marker.bindPopup(function(){
            let div = document.createElement('div');
            div.innerHTML = `<h1>${r.name}</h1>
                        <button class="btn">Click me</button>
            `;
            div.querySelector(".btn").addEventListener("click", function(){
                alert(r.name);
            })

            return div;
        });

        // display the search result under the search box

        // create a new element to store the result
        let resultElement = document.createElement('div');
        resultElement.innerHTML = r.name;
        resultElement.classList.add("search-result-entry");

        document.querySelector("#search-results").appendChild(resultElement);
        resultElement.addEventListener("click", function(){
           map.flyTo([lat,lng]);
           marker.openPopup();
        })

    }
}

function toggle_search() {
    let searchContainer = document.querySelector("#search-container");
    // check if the search container is visible
    if (!searchContainer.style.display || searchContainer.style.display=='none') {
        // if not, then cause it to appear
        // since the <div> is a block level element
        // there when we display it we set 'style.display' to be 'block'
        searchContainer.style.display="block"; 
    } else {
        searchContainer.style.display="none";
    }
}