let boxState = false;

const quantidade = document.getElementById('quantidade');
    quantidade.addEventListener('keyup',()=>{
        pegaPokemons(quantidade.value);
})


pegaPokemons(6);

// function clicar() {
//     let zoom = document.querySelector('.pokemon-box').innerText;

//     // for (let i = 0; i < zoom.length; i++) {
//         // console.log(zoom)
//     // }

//     if(boxState == false){
//         zoom.addEventListener('click', ()=>{
//             zoom.style = "width: 200%;"
//         })

//         boxState = true;
//     }else if(boxState == true){
//         zoom.addEventListener('click', ()=>{
//             zoom.style = "width: 29%;"
//         })
//         boxState = false;
//     }
    
//     console.log(boxState);
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
                let sprite = pokemonSingle.sprites.other.dream_world.front_default
                let type = pokemonSingle.types[0].type.name;

                pokemons.push({
                    nome: val.name, 
                    imagem: sprite, 
                    tipo: type
                });

                if(pokemons.length == quantidade){

                    const el = document.querySelector('.pokemon-boxes');
                    el.innerHTML = "";

                    pokemons.map(function(val) {
                        
                        el.innerHTML += `
                            <div class="pokemon-box" id="`+ val.tipo +`">
                                <img src=`+ val.imagem +`>
                                <p>`+ val.nome +`</p>
                            </div>
                        `;
                    })
                }
            })
        })  
    })

}
