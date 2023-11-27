const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const loadMoreLimit = 20;
let offset = 0;
let isLoading = false;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    isLoading = true;
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        isLoading = false;
    });
}

function isAtEndOfPage() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = totalHeight - (scrollTop + windowHeight);

    return scrollBottom < 100;
}

function handleScroll() {
    if (!isLoading && isAtEndOfPage() && offset < maxRecords) {
        const remainingPokemons = maxRecords - offset;
        const nextLoad = Math.min(loadMoreLimit, remainingPokemons);
        loadPokemonItems(offset, nextLoad);
        offset += nextLoad;
    }
}

function handleLoadMoreClick() {
    if(offset < maxRecords){
    loadPokemonItems(offset, loadMoreLimit);
    offset += loadMoreLimit;
    } else if (offset === maxRecords){
        alert('Chegou ao numero maximo de pokemons da 1ª geração')
    }
}

window.addEventListener('scroll', handleScroll);
loadMoreButton.addEventListener('click', handleLoadMoreClick);

loadPokemonItems(offset, loadMoreLimit);
offset += loadMoreLimit;
