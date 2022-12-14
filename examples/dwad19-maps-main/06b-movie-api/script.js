const BASE_API_URL="https://www.omdbapi.com/";

document.querySelector("#searchBtn")
    .addEventListener("click", async function(){

      // each time the search button is clicked,
      // clear all existing search results
      document.querySelector("#searchResults").innerHTML = "";

      let title = document.querySelector("#title").value;
      // select the element with class "type" and is checked
      let type = document.querySelector(".type:checked").value;

      // the second parameter of axios.get is a configuration object
      // so in the configuration object, we can set the parameters as an object
      const response = await axios.get(BASE_API_URL, {
        params:{
            "apikey":"1891b5a6",
            "s": title,
            "type":type
        }   
      })  
      
       for (let movie of response.data.Search) {
          document.querySelector("#searchResults").innerHTML += `
            <h1>${movie.Title}</h1>
            <h2>${movie.Year}</h2>
            <img src="${movie.Poster}"/>
          
          `
       }

    })