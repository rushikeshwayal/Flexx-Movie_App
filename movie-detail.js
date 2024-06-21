const movieID = window.location.search.split('=')[1];
// console.log(movieID);
const movieDetailTitle = document.querySelector('.movieDetailTitle');
const releaseDetail = document.querySelector('.releaseDetail');
const discription = document.querySelector('.discription');
const poster = document.querySelector('img');
const ul = document.querySelector('ul');
const popular = document.querySelector('.popularity');
const voteavg = document.querySelector('.vote_average');
const voteCount = document.querySelector('.vote_count');
const mediaType = document.querySelector('.media_type');
console.log(poster);

// loder
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

// Hide loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Call showLoader before fetch and hideLoader after data is fetched


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ZmNDYzZDQ5ZDc1N2FkMTFlNTM2NDU2YWE2ZWJlMSIsInN1YiI6IjY2NWEwZWI4NWQyMmJjMzBmMDJkNjJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hojCu8rUZdf4xUQPbLaaVg2s0qpZzi8Yue6c1lfRfVY'
  }
};
showLoader()
fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then(response => response.json())
  .then(response => {
    hideLoader()
    const results = response.results;

    if (!results || results.length === 0) {
      console.error('No results found.');
      return;
    }

    for (let i = 0; i < 20; i++) {
      // Ensure the index is within the results array length
      if (i >= results.length) {
        console.error(`Index ${i} is out of bounds.`);
        continue;
      }

      if (movieID == i) {
        const movie = results[i];
        if (!movie) {
          console.error(`No movie found at index ${i}.`);
          continue;
        }

        const original_title1 = movie.original_title;
        const original_title2 = movie.name;

        if (original_title1) {
          movieDetailTitle.innerHTML = original_title1;
        } else {
          movieDetailTitle.innerHTML = original_title2 || 'No Title Available';
        }

        const release_date = movie.release_date;
        const release_date2 = movie.first_air_date;

        releaseDetail.innerHTML = `Release: ${release_date || release_date2 || 'No Release Date Available'}`;

        const poster_path = movie.poster_path;
        if (poster_path) {
          poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          console.error('No poster path available.');
        }

        const overview = movie.overview;
        discription.innerHTML = overview || 'No description available.';

        const genre_ids = movie.genre_ids;
        if (genre_ids) {
          ul.innerHTML = '';
          for (let j = 0; j < genre_ids.length; j++) {
            const li = document.createElement('li');
            li.innerHTML = genre_ids[j];
            ul.appendChild(li);
          }
        } else {
          console.error('No genre IDs available.');
        }

        let popularity = movie.popularity || 'N/A';
        let vote_average = movie.vote_average || 'N/A';
        let vote_count = movie.vote_count || 'N/A';
        let media_type = movie.media_type || 'N/A';

        popular.innerHTML = `Popularity: ${popularity}`;
        voteavg.innerHTML = `Vote Average: ${vote_average}`;
        voteCount.innerHTML = `Vote Count: ${vote_count}`;
        mediaType.innerHTML = `Media Type: ${media_type}`;

        // Apply style to the popularity label
        let partsPopular = popular.textContent.split(':');
        let partsvoteavg = voteavg.textContent.split(':');
        let partsvotecount = voteCount.textContent.split(':');
        let partsmediatype = mediaType.textContent.split(':');

        popular.innerHTML = `<span style="color: gold;">${partsPopular[0]}</span> : ${partsPopular[1].trim()}`;
        voteavg.innerHTML = `<span style="color: gold;">${partsvoteavg[0]}</span> : ${partsvoteavg[1].trim()}`;
        voteCount.innerHTML = `<span style="color: gold;">${partsvotecount[0]}</span> : ${partsvotecount[1].trim()}`;
        mediaType.innerHTML = `<span style="color: gold;">${partsmediatype[0]}</span> : ${partsmediatype[1].trim()}`;

        break; // Exit loop once the correct movie is found
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    hideLoader()
    const results = response.results;
      console.log(results);

    if (!results || results.length === 0) {
      console.error('No results found.');
      return;
    }

    for (let i = 0; i < 20; i++) {
      // Ensure the index is within the results array length
      if (i >= results.length) {
        console.error(`Index ${i} is out of bounds.`);
        continue;
      }

      if (movieID == i+20) {
        const movie = results[i];
        if (!movie) {
          console.error(`No movie found at index ${i}.`);
          continue;
        }

        const original_title1 = movie.original_title;

        if (original_title1) {
          movieDetailTitle.innerHTML = original_title1;
        } else {
          movieDetailTitle.innerHTML = 'No Title Available';
        }

        const release_date = movie.release_date;
        const release_date2 = movie.first_air_date;

        releaseDetail.innerHTML = `Release: ${release_date || release_date2 || 'No Release Date Available'}`;

        const poster_path = movie.poster_path;
        if (poster_path) {
          poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          console.error('No poster path available.');
        }

        const overview = movie.overview;
        discription.innerHTML = overview || 'No description available.';

        const genre_ids = movie.genre_ids;
        if (genre_ids) {
          ul.innerHTML = '';
          for (let j = 0; j < genre_ids.length; j++) {
            const li = document.createElement('li');
            li.innerHTML = genre_ids[j];
            ul.appendChild(li);
          }
        } else {
          console.error('No genre IDs available.');
        }

        let popularity = movie.popularity || 'N/A';
        let vote_average = movie.vote_average || 'N/A';
        let vote_count = movie.vote_count || 'N/A';
        let media_type = movie.media_type || 'N/A';

        popular.innerHTML = `Popularity: ${popularity}`;
        voteavg.innerHTML = `Vote Average: ${vote_average}`;
        voteCount.innerHTML = `Vote Count: ${vote_count}`;
        mediaType.innerHTML = `Media Type: ${media_type}`;

        // Apply style to the popularity label
        let partsPopular = popular.textContent.split(':');
        let partsvoteavg = voteavg.textContent.split(':');
        let partsvotecount = voteCount.textContent.split(':');
        let partsmediatype = mediaType.textContent.split(':');

        popular.innerHTML = `<span style="color: gold;">${partsPopular[0]}</span> : ${partsPopular[1].trim()}`;
        voteavg.innerHTML = `<span style="color: gold;">${partsvoteavg[0]}</span> : ${partsvoteavg[1].trim()}`;
        voteCount.innerHTML = `<span style="color: gold;">${partsvotecount[0]}</span> : ${partsvotecount[1].trim()}`;
        mediaType.innerHTML = `<span style="color: gold;">${partsmediatype[0]}</span> : ${partsmediatype[1].trim()}`;

        break; // Exit loop once the correct movie is found
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));



  //tv series
  fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    
     const results = response.results;
      console.log(results);
     for (let i = 0; i < 20; i++) {
      // Ensure the index is within the results array length
      if (i >= results.length) {
        console.error(`Index ${i} is out of bounds.`);
        continue;
      }

      if (movieID == i+40) {
        const subtitle = document.querySelector('.subTitle')
        subtitle.innerHTML = 'Show Info';
        const movie = results[i];
        if (!movie) {
          console.error(`No movie found at index ${i}.`);
          continue;
        }

        const original_title1 = movie.original_title;
        const original_title2 = movie.name;

        if (original_title1) {
          movieDetailTitle.innerHTML = original_title1;
        } else {
          movieDetailTitle.innerHTML = original_title2 || 'No Title Available';
        }

        const release_date = movie.release_date;
        const release_date2 = movie.first_air_date;

        releaseDetail.innerHTML = `Release: ${release_date || release_date2 || 'No Release Date Available'}`;

        const poster_path = movie.poster_path;
        if (poster_path) {
          poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          console.error('No poster path available.');
        }

        const overview = movie.overview;
        discription.innerHTML = overview || 'No description available.';

        const genre_ids = movie.genre_ids;
        if (genre_ids) {
          ul.innerHTML = '';
          for (let j = 0; j < genre_ids.length; j++) {
            const li = document.createElement('li');
            li.innerHTML = genre_ids[j];
            ul.appendChild(li);
          }
        } else {
          console.error('No genre IDs available.');
        }

        let popularity = movie.popularity || 'N/A';
        let vote_average = movie.vote_average || 'N/A';
        let vote_count = movie.vote_count || 'N/A';
        let media_type = movie.media_type || 'N/A';

        popular.innerHTML = `Popularity: ${popularity}`;
        voteavg.innerHTML = `Vote Average: ${vote_average}`;
        voteCount.innerHTML = `Vote Count: ${vote_count}`;
        mediaType.innerHTML = `Media Type: ${media_type}`;

        // Apply style to the popularity label
        let partsPopular = popular.textContent.split(':');
        let partsvoteavg = voteavg.textContent.split(':');
        let partsvotecount = voteCount.textContent.split(':');
        let partsmediatype = mediaType.textContent.split(':');

        popular.innerHTML = `<span style="color: gold;">${partsPopular[0]}</span> : ${partsPopular[1].trim()}`;
        voteavg.innerHTML = `<span style="color: gold;">${partsvoteavg[0]}</span> : ${partsvoteavg[1].trim()}`;
        voteCount.innerHTML = `<span style="color: gold;">${partsvotecount[0]}</span> : ${partsvotecount[1].trim()}`;
        mediaType.innerHTML = `<span style="color: gold;">${partsmediatype[0]}</span> : ${partsmediatype[1].trim()}`;

        break; // Exit loop once the correct movie is found
      }
    }
  })
  .catch(error => console.error('Error fetching data:', error));







fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
      hideLoader()
    const results = response.results;

    if (!results || results.length === 0) {
      console.error('No results found.');
      return;
    }

    for (let i = 0; i < 20; i++) {
      // Ensure the index is within the results array length
      if (i >= results.length) {
        console.error(`Index ${i} is out of bounds.`);
        continue;
      }

      if (movieID == i+20) {

        const movie = results[i];
        if (!movie) {
          console.error(`No movie found at index ${i}.`);
          continue;
        }

        const original_title1 = movie.original_title;

        if (original_title1) {
          movieDetailTitle.innerHTML = original_title1;
        } else {
          movieDetailTitle.innerHTML = 'No Title Available';
        }

        const release_date = movie.release_date;
        const release_date2 = movie.first_air_date;

        releaseDetail.innerHTML = `Release: ${release_date || release_date2 || 'No Release Date Available'}`;

        const poster_path = movie.poster_path;
        if (poster_path) {
          poster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          console.error('No poster path available.');
        }

        const overview = movie.overview;
        discription.innerHTML = overview || 'No description available.';

        const genre_ids = movie.genre_ids;
        if (genre_ids) {
          ul.innerHTML = '';
          for (let j = 0; j < genre_ids.length; j++) {
            const li = document.createElement('li');
            li.innerHTML = genre_ids[j];
            ul.appendChild(li);
          }
        } else {
          console.error('No genre IDs available.');
        }

        let popularity = movie.popularity || 'N/A';
        let vote_average = movie.vote_average || 'N/A';
        let vote_count = movie.vote_count || 'N/A';
        let media_type = movie.media_type || 'N/A';

        popular.innerHTML = `Popularity: ${popularity}`;
        voteavg.innerHTML = `Vote Average: ${vote_average}`;
        voteCount.innerHTML = `Vote Count: ${vote_count}`;
        mediaType.innerHTML = `Media Type: ${media_type}`;

        // Apply style to the popularity label
        let partsPopular = popular.textContent.split(':');
        let partsvoteavg = voteavg.textContent.split(':');
        let partsvotecount = voteCount.textContent.split(':');
        let partsmediatype = mediaType.textContent.split(':');

        popular.innerHTML = `<span style="color: gold;">${partsPopular[0]}</span> : ${partsPopular[1].trim()}`;
        voteavg.innerHTML = `<span style="color: gold;">${partsvoteavg[0]}</span> : ${partsvoteavg[1].trim()}`;
        voteCount.innerHTML = `<span style="color: gold;">${partsvotecount[0]}</span> : ${partsvotecount[1].trim()}`;
        mediaType.innerHTML = `<span style="color: gold;">${partsmediatype[0]}</span> : ${partsmediatype[1].trim()}`;

        displayBackground(results[i].backdrop_path);

        break; // Exit loop once the correct movie is found
      }
    }
})


function displayBackground(backgroundPath) {
    console.log(backgroundPath);
  if (!backgroundPath) {
    console.error('Background path is not available.');
    return;
  }

  // Construct the full image URL
  const fullImageUrl = `https://image.tmdb.org/t/p/original${backgroundPath}`;

  // Create a new div element for the overlay
  const overlay = document.createElement('div');
  overlay.style.backgroundImage = `url(${fullImageUrl})`;
  overlay.style.backgroundSize = 'cover';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  overlay.style.height = '100vh';
  overlay.style.width = '100vw';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.1';

  // Ensure the parent element exists
  const moviesDetailElement = document.querySelector('.movies-detail');
  if (!moviesDetailElement) {
    console.error('Parent element `.movies-detail` not found.');
    return;
  }

  // Append the overlay to the parent element
  moviesDetailElement.appendChild(overlay);
}
