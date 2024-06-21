
const movieTitle = document.querySelectorAll('.movieTitle');
const release = document . querySelectorAll('.release')
const poster = document . querySelectorAll('img')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ZmNDYzZDQ5ZDc1N2FkMTFlNTM2NDU2YWE2ZWJlMSIsInN1YiI6IjY2NWEwZWI4NWQyMmJjMzBmMDJkNjJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hojCu8rUZdf4xUQPbLaaVg2s0qpZzi8Yue6c1lfRfVY'
  }
};

fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    for (let i = 0; i < 20; i++) {
    //title
       const original_title=response.results[i].original_name;
       movieTitle[i].innerHTML=original_title;
       
    
    // release date
    const first_air_date = response.results[i].first_air_date;
    release[i].innerHTML = `Release : ${first_air_date}`;

    //poster
    const poster_path = response.results[i].poster_path;
    poster[i].src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  
    }

})
  .catch(err => console.error(err));

