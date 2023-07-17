const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

// Function to fetch data from api
const getMovie = () => {
  const movieName = movieNameRef.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apiKey=${key}`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  } else {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="info">
            <img src="${data.Poster}" class="poster">
            <div>
              <h2>${data.Title}</h2>
              <div class="rating">
                <img src="./img/star-icon.svg">
                <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div>
              <div class="genre">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
            </div>
          </div>
          <h3>Plot:</h3>
          <p>${data.Plot}</p>
          <h3>Cast:</h3>
          <p>${data.Actors}</p>
        `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurend</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
