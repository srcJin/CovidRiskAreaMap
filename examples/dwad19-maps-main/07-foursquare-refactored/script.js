

async function main() {
    // call the init function
    init();
 
    // it is possible to define function inside another function
    function init() {
        let map = initMap();

        // add the search results maker to a LayerGroup
        // for easier management, and so that we can toggle it on/off
        const resultLayer = L.layerGroup();
        resultLayer.addTo(map);
        
        document.querySelector("#search-btn").addEventListener("click", async function(){

            // remove all existing markers from search
            resultLayer.clearLayers();

            const searchTerms = document.querySelector("#search-terms").value;
            const center = map.getBounds().getCenter();
            const ll = center.lat + "," + center.lng;
            const results = await loadData(searchTerms, ll, 2000);
            displaySearchResults(results.results, resultLayer,  map);
 
        });

        document.querySelector("#toggle-search-btn").addEventListener("click", function(){
           toggle_search();
        })
    }
}

main();
