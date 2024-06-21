

// Show loader


function showLoader() {
  document.getElementById('loader').style.display = 'block';
  document.querySelector('.Movieslist').style.filter = 'blur(5px)';
  document.querySelector('.home').style.filter = 'blur(5px)';
}

// Hide loader
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
  document.querySelector('.Movieslist').style.filter = 'none';
  document.querySelector('.home').style.filter = 'none';
}
const movieTitle = document.querySelectorAll('.movieTitle');
const release = document.querySelectorAll('.release')
const poster = document.querySelectorAll('img')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ZmNDYzZDQ5ZDc1N2FkMTFlNTM2NDU2YWE2ZWJlMSIsInN1YiI6IjY2NWEwZWI4NWQyMmJjMzBmMDJkNjJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hojCu8rUZdf4xUQPbLaaVg2s0qpZzi8Yue6c1lfRfVY'
  }
};

showLoader();
fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then(response => response.json())
  .then(response => {

    hideLoader();
    console.log(response);
    for (let i = 0; i < 20; i++) {
      //title
      const original_title1 = response.results[i].original_title;
      const original_title2 = response.results[i].name;



      if (original_title1) {
        movieTitle[i].innerHTML = original_title1;
      }
      else {
        movieTitle[i].innerHTML = original_title2;
      }


      // release date
      const release_date = response.results[i].release_date;
      const release_date2 = response.results[i].first_air_date;

      if (release_date) {
        release[i].innerHTML = `Release : ${release_date}`;
      }
      else {
        release[i].innerHTML = `Release : ${release_date2}`;
      }


      //poster
      const poster_path = response.results[i].poster_path;
      poster[i].src = `https://image.tmdb.org/t/p/w500${poster_path}`;


    }

  })
  .catch(err => console.error(err));








