// ELEMENTO HTML ONDE OS POKEMONS SERÃO EXIBIDOS
const containerPokemon = document.getElementById('listPokemon');

// DECLARAÇÃO DA API
const urlPokemom = 'https://pokeapi.co/api/v2/pokemon?';

// FUNÇÃO PARA RECEBER OS DADOS DA API
async function dataPokemons(){
    try{
        // PRIMEIRA PROMISSE
        const response = await fetch(urlPokemom);

        // VERIFICAÇÃO BÁSICA DE ERRO NO HTTP
        if(!response.ok){
            throw new Error("ERRO NA BUSCA DE DADOS INICIAIS");
        }

        // SEGUNDA PROMISSE
        const data = await response.json();

        // TRANSFORMA O ARRAY DE POKÉMONS EM UM ARRAY DE PROMESSAS
        const arraySearch = data.results.map(pokemon =>{
             return fetch(pokemon.url).then(res => res.json());
        });

        // RECEBENDO O ARRAY EM UM OBJETO COMPLETO
        const informationsPokemons = await Promise.all(arraySearch);

        // ---------- EXIBINDO NA TELA ---------- //

        informationsPokemons.forEach(pokemon => {
            // RECEBENDO OS NOMES E AS IMAGENS
            const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // testar sem
            const image = pokemon.sprites.front_default;

            // GERANDO ELEMENTO HTML
            const card = document.createElement('div');
            card.className = 'cardPokemon';

            // INSERINDO INFORMAÇÕES NO CARD
            card.innerHTML = `<h3>${name}</h3>
            <img src="${image}" alt="image ${image}" style="width:100px;">`;

            containerPokemon.appendChild(card);
        });
    }
    catch(error){
        console.error("ERRO NA BUSCA DE DADOS");
    }
}

dataPokemons();

