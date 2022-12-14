// async function loadData() {
//     const response = await axios.get("https://pokeapi.co/api/v2/pokemon/pikachu/");
//     console.log(response.data);
// }

// loadData();

document.querySelector("#searchBtn").addEventListener("click", async function(){
    const searchTerms = document.querySelector("#search").value;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerms}/`);
    console.log(response.data);

    document.querySelector("#searchResults").innerHTML =`
        <h1>${response.data.name}</h1>
        <ul>
            <li>Weight:${response.data.weight}</li>
            <li>Height: ${response.data.height}</li>
            <li>Base Experience: ${response.data.base_experience}</li>
        </ul>
        <img src="${response.data.sprites.other["official-artwork"].front_default}"/>
    `
})