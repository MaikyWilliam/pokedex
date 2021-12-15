let boxState = false;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const baseUrlQtd = 'https://pokeapi.co/api/v2/pokemon?limit=';
const el = document.querySelector('.pokemon-boxes');

document.getElementById('quantidade').addEventListener('change', ()=>{
    let qtd = document.getElementById('quantidade').value;
    let urlCompletaQtd = baseUrlQtd + qtd;

    allPokemons(urlCompletaQtd)
})

document.getElementById('idPokemon').addEventListener('change', ()=>{
    let n = document.getElementById('idPokemon').value;
    let random = Math.floor(Math.random() * 640);
    nome = n.toLowerCase();

    if(nome <= 0 || nome > 640){
        getPokemon(baseUrl + random)
    }else if(nome == " "){
        getPokemon(baseUrl + random)
    }else{
        let urlCompleta = baseUrl+nome; 
        getPokemon(urlCompleta)
    }
    
})

async function allPokemons(urlCompletaQtd) {
    let allPokemon = await fetch(urlCompletaQtd);
    let objectPokemon = await allPokemon.json();

    el.innerHTML = "";
    objectPokemon.results.forEach(element => {
        upPokemon(element)
    });
}

async function upPokemon(element) {
    document.getElementById('idPokemon').value = "";
    document.getElementById('quantidade').value = "";
    let pokemonUrl = await fetch(element.url);
    let pokemonSingle = await pokemonUrl.json();
    

    let pokemon = [];

    try {
        // console.log(objectPokemon)

        let type = pokemonSingle.types.map(function (tipo){
            return tipo.type.name;
        })

        pokemon.push({
            nome: pokemonSingle.name,
            imagem: pokemonSingle.sprites.other.dream_world.front_default,
            tipo: type,
            id: pokemonSingle.id,
            hp: pokemonSingle.stats[0].base_stat,
            ataque: pokemonSingle.stats[1].base_stat,
            defesa: pokemonSingle.stats[2].base_stat,
            ataque_especial: pokemonSingle.stats[3].base_stat,
            defesa_especial: pokemonSingle.stats[4].base_stat,
            velocidade: pokemonSingle.stats[5].base_stat
        });
 
        getTextSingle(pokemon);
        
        // console.log(pokemon)

    } catch (error) {

    }
    // console.log(pokemonSingle)
}

async function getPokemon(urlCompleta){
    document.getElementById('quantidade').value = "";
    document.getElementById('idPokemon').value = "";
    let allPokemon = await fetch(urlCompleta);
    let objectPokemon = await allPokemon.json();
    let pokemon = [];

    try {
        // console.log(objectPokemon)

        let type = objectPokemon.types.map(function (tipo){
            return tipo.type.name;
        })

        pokemon.push({
            nome: objectPokemon.name,
            imagem: objectPokemon.sprites.other.dream_world.front_default,
            tipo: type,
            id: objectPokemon.id,
            hp: objectPokemon.stats[0].base_stat,
            ataque: objectPokemon.stats[1].base_stat,
            defesa: objectPokemon.stats[2].base_stat,
            ataque_especial: objectPokemon.stats[3].base_stat,
            defesa_especial: objectPokemon.stats[4].base_stat,
            velocidade: objectPokemon.stats[5].base_stat
        });

        el.innerHTML = "";  

        getText(pokemon);

    } catch (error) {

    }
}

function clicar() {
    let zoom = document.querySelector('.pokemon-box');
    let img = document.querySelector('.pokemon-box img');
    let p = document.querySelector('.pokemon-box p');


    for (let i = 0; i < zoom.length; i++) {
        console.log(zoom);
    }

    if(boxState == false){
        zoom.addEventListener('click', ()=>{
            zoom.style = "width: 100%;"
            img.style = "width: 29%;"
            p.style = "text-align: left; margin-left: 40px;"
        })

        boxState = true;
    }else if(boxState == true){
        zoom.addEventListener('click', ()=>{
            zoom.style = "width: 29%;"
            img.style = "width: 100%;"
        })
        boxState = false;
    }
}

function getTextSingle(pokemon) {
    return  el.innerHTML += `
            <div class="pokemon-box" tipo="`+ pokemon[0].tipo +`" onclick="clicar();">
                <img src=`+ pokemon[0].imagem +`>
                <p>`+ 'Nome: ' + pokemon[0].nome +`</p>
                <p>`+ 'Tipo: ' + pokemon[0].tipo +`</p>
            </div> 
            `;     
}

function getText(pokemon) {
    return  el.innerHTML += `
            <div class="pokemon-box" tipo="`+ pokemon[0].tipo +`" onclick="clicar();">
                <img src=`+ pokemon[0].imagem +`>
                
            </div>
            <div class="status">
                    <h2>Status</h2>
                    <p>`+ 'Nome: ' + pokemon[0].nome +`</p>
                    <p>`+ '#ID:  '+ pokemon[0].id +`</p>
                    <p>`+ 'Tipo: ' + pokemon[0].tipo +`</p>
                    <p>`+ 'Hp:   '+ pokemon[0].hp +`</p>
                    <p>`+ 'Ataque:   '+ pokemon[0].ataque +`</p>
                    <p>`+ 'Ataque Especial:   '+ pokemon[0].ataque_especial +`</p>
                    <p>`+ 'Defesa:   '+ pokemon[0].defesa +`</p>
                    <p>`+ 'Defesa Especial:   '+ pokemon[0].defesa_especial +`</p>
                    <p>`+ 'Velocidade:   '+ pokemon[0].velocidade +`</p>
                </div>
            `;     
}

