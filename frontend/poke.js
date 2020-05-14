var pokeName; 

function onload() { 
        pokeName = document.getElementById("inputPokemon");
        document.querySelector('.pokemon').style.display = 'none';
        document.querySelector('.pokemonWallpaper').style.display = 'none';
    }
    
function clearField() {
    document.getElementById("inputPokemon").value = "";
}

function getPokeWallpaper(pokeID){
    document.querySelector('.pokemonWallpaper').style.display = 'block';
    document.querySelector('.pokemon').style.display = 'none';
    const pokeresUrl = 'https://pokeres.bastionbot.org/images/pokemon/' + pokeID +'.png';
    console.log(pokeresUrl);
    const imgHtml = `<img src=${pokeresUrl}>`;
    const pokemonWallDiv = document.querySelector('.pokemonWallpaper'); // get pokemonWallpaper div from index.html
        pokemonWallDiv.innerHTML = imgHtml;
}

// function getPokeCard() {
//     document.querySelector('.pokemonCard').style.display = 'block';
//     const pokeCardApiUrl = 'https://pokemontcg.io/v1/cards?name=' + pokeName.value;
//     console.log(pokeCardApiUrl);
    // fetch(proxyurl + pokeCardApiUrl) //, {mode: 'no-cors'}
    //     .then((data) => data.json)
    //     .then((pokemonCards) => console.log(pokemonCards.cards[0].imageUrl))
    //     .catch(() => console.log("Can’t access " + pokeCardApiUrl + " response. Blocked by browser?"))
    //console.log(pokemonCards.cards[0].imageUrl)
//}

// function reqListener() {
//   var data = JSON.parse(this.responseText);
//   console.log(data);
// }

// function reqError(err) {
//   console.log('Fetch Error :-S', err);
// }

// function cards(){
// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.onerror = reqError;
// oReq.open('get', 'http://pokemontcg.io/cards?name=charizard', true);
// oReq.send();
// }


function getPokeData(){    
    document.querySelector('.pokemon').style.display = 'block';
    document.querySelector('.pokemonWallpaper').style.display = 'none';
    const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.value;
    fetch(pokeApiUrl)
        .then( (data) => {
            if (data.ok){
                return data.json()}
            throw new Error('Response not ok.');
        })
        .then((pokemonData) => generateHtml(pokemonData))
        .catch(error => alert("This pokemon does not exist!!!"));
        
    const generateHtml = (pokemonData) => {
        const html = `
        <div class="name">${pokemonData.name}</div>
        <div class="pokemonDetails">
            <span>Special move: ${pokemonData.moves[0].move.name}</span><br/>
            <span>Height: ${pokemonData.height} cm</span><br/>
            <span>Weight: ${pokemonData.weight} kg</span><br/>
            <span>Experience: ${pokemonData.base_experience}</span>
        </div>
        <button type="submit" id="pokeCardBtn" name="pokeCardBtn" onClick="getPokeWallpaper(${pokemonData.id}); clearField();">See Pokémon!</button>
        `;
        const pokemonDiv = document.querySelector('.pokemon'); // get pokemon div from index.html
        pokemonDiv.innerHTML = html;
    };
}



