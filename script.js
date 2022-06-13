//https://furry-firefly-24d.notion.site/Exercicio-03-05-2022-6a6901b92fd241dc9ae7ee5de13836a8

const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

const image = document.querySelector(".poki");
const container = document.querySelector(".container");
const showAll = document.querySelector(".btn1");

const renderPokemon = function (data, className = "") {
  const html = `<article class="name ${className}">
      <img class="pokemon__img" src="${data.results}" />
      <div class="pokemon__data">
        <h3 class="pokemon__name">${data.results}</h3>
      </div>
    </article>`;
  container.insertAdjacentHTML("beforeend", html);
};

const getJSON = function (url, errorMessage = "Something went wrong") {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }

    return response.json();
  });
};

const renderError = function (message) {
  container.insertAdjacentText("beforeend", message);
};

const getPokemon = function () {
  getJSON(`https://pokeapi.co/api/v2/pokemon?limit=150`, `Pokemon not found`)
    .then(function (data) {
      console.log(data.results);

      const name = data.results.map(function (name) {
        return name.name;
      });
      console.log(name);
      renderPokemon(name);

      if (!name) {
        throw new Error("No name found!");
      }

      const image = data.results.map(function (url) {
        return url.url;
      });
      console.log(image);
      renderPokemon(image);

      if (!image) {
        throw new Error("No image found!");
      }

      return getJSON(
        `https://pokeapi.co/api/v2/pokemon?offset=150`,
        `pokemon not found`
      );
    })
    .then(function (data) {
      return renderPokemon(data, "name");
    })
    .then(function (data) {
      return renderPokemon(data, "image");
    })
    .catch(function (error) {
      return renderError(`Something went wrong ${error.message}!`);
    });
};

getPokemon();

// showAll.addEventListener("click", function () {
//   getPokemon("");
// });
