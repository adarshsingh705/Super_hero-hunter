// favorite.js

const url =
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=9b4ba214347a8aa5026223be1b759e44&hash=1530de2cd26f5e11d34d062cfb952ef7";

window.onload = async () => {
  let favoriteHeroesContainer = "";
  try {
    let favoriteHeroes =
      JSON.parse(localStorage.getItem("favoriteHeroes")) || [];

    // Fetch the full character data using the Marvel API with stored hero IDs
    let response = await fetch(url);
    let data = await response.json();
    let characters = data.data.results;

    // Render favorite hero cards in HTML using a forEach loop
    characters.forEach((character) => {
      if (favoriteHeroes.includes(character.id.toString())) {
        const imageSrc =
          character.thumbnail.path +
          (character.thumbnail.extension === "jpg"
            ? "/portrait_medium.jpg"
            : "/portrait_medium.gif");

        favoriteHeroesContainer += `<div class="card" id="${character.id}" style="width: 18rem">
              <img src=${imageSrc} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Hero ID: ${character.id}</li>
                <li class="list-group-item">Comics available: ${character.comics.available} <a href="${character.urls[1].url}">click</a></li>                <li class="list-group-item">Series available: ${character.series.available}</li>
              </ul>
              <div class="card-body">
              <button class="btn btn-danger revbtn" type="button" data-hero="${character.id}">
                REMOVE FROM FAVORITE
              </button>
            </div>
            </div>`;
      }
    });

    document.getElementById("favorite-characters-container").innerHTML =
      favoriteHeroesContainer;

    document.querySelectorAll(".revbtn").forEach((btn) => {
      btn.addEventListener("click", removeFromFav); // Corrected function reference
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to remove a character from the user's favorites
const removeFromFav = function (e) {
  try {
    let heroId = e.target.dataset.hero;
    console.log("Clicked Remove Button for Hero ID:", heroId);

    // Retrieve favoriteHeroes array from localStorage
    let favoriteHeroes =
      JSON.parse(localStorage.getItem("favoriteHeroes")) || [];
    console.log("Current favoriteHeroes array:", favoriteHeroes);

    // Remove the heroId from the array
    const index = favoriteHeroes.indexOf(heroId);
    if (index !== -1) {
      favoriteHeroes.splice(index, 1);

      // Update localStorage with the modified array
      localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
      console.log("Updated favoriteHeroes array:", favoriteHeroes);

      // Remove the card from the UI
      const cardToRemove = document.getElementById(heroId);
      if (cardToRemove) {
        cardToRemove.remove();
      }
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

document
  .getElementById("home-page11")
  .addEventListener("click", function (event) {
    event.preventDefault();
    location.href = "index.html"; // Redirect to the specified page
  });
