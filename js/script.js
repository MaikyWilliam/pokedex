const quantidade = document.getElementById('quantidade');
    quantidade.addEventListener('keyup',()=>{
        pegaPokemons(quantidade.value);
})

pegaPokemons(3);

// function clicar() {
//     let zoom = document.querySelector('.pokemon-box');

//     zoom.addEventListener('click', ()=>{
//         zoom.style = "width: 200%;"
//     })
// }

function pegaPokemons(quantidade) {
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allPokemon => {

        const pokemons = [];

        allPokemon.results.map((val)=>{

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemonSingle.sprites.other.dream_world.front_default
                pokemons.push({nome: val.name, imagem: pokemonSingle.sprites.other.dream_world.front_default});

                if(pokemons.length == quantidade){

                    const el = document.querySelector('.pokemon-boxes');
                    el.innerHTML = "";

                    pokemons.map(function(val) {
                        el.innerHTML += `
                            <div class="pokemon-box">
                                <img src=`+ val.imagem +` onclick="clicar();">
                                <p>`+ val.nome +`</p>
                            </div>
                        `;
                    })
                }
            })
        })  
    })

}
