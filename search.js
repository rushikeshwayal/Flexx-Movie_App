function showLoader() {
  document.getElementById('loader').style.display = 'block';
  document.querySelector('header').style.filter = 'blur(5px)';
  document.querySelector('.search').style.filter = 'blur(5px)';
  document.querySelector('.popular').style.filter = 'blur(5px)';
  document.querySelector('footer').style.filter = 'blur(5px)';
}

// Hide loader
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
  document.querySelector('header').style.filter = 'none';
  document.querySelector('.search').style.filter = 'none';
  document.querySelector('.popular').style.filter = 'none';
  document.querySelector('footer').style.filter = 'none';
}

const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ZmNDYzZDQ5ZDc1N2FkMTFlNTM2NDU2YWE2ZWJlMSIsInN1YiI6IjY2NWEwZWI4NWQyMmJjMzBmMDJkNjJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hojCu8rUZdf4xUQPbLaaVg2s0qpZzi8Yue6c1lfRfVY';
const baseUrlMovies = 'https://api.themoviedb.org/3/discover/movie';
const baseUrlTVShows = 'https://api.themoviedb.org/3/discover/tv';
let currentPage = 1; // Track the current page
let totalMovies = 200; // Total number of movies to fetch
let moviesPerPage = 20; // Movies per API page
let moviesList = []; // Store fetched movies

// Function to fetch movies


showLoader();
async function fetchMovies(page) {
    try {
        const response = await fetch(`${baseUrl}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: apiKey,
        

            },
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results;

    } catch (err) {
        console.error(`Error fetching page ${page}: `, err);
        return [];
    }
}
hideLoader();
// Function to load all movies
async function loadAllMovies() {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    for (let page = 1; page <= totalPages; page++) {
        const movies = await fetchMovies(page);
        moviesList.push(...movies);
    }
}

// Function to filter and search movies
function filterMovies(searchTerm, filterType) {
    return moviesList.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (filterType === 'Movies') {
            return matchesSearch; // Assuming we are only fetching movies
        }
        // Add more conditions if filtering by TV shows or other criteria in the future
        return matchesSearch;
    });
}

// Function to display movies
function displayMovies(page = 1, searchTerm = '', filterType = 'Movies') {
    const start = (page - 1) * moviesPerPage;
    const end = page * moviesPerPage;
    const filteredMovies = filterMovies(searchTerm, filterType);
    const moviesToShow = filteredMovies.slice(start, end);

    const moviesContainer = document.querySelector('.Movieslist');
    moviesContainer.innerHTML = ''; // Clear existing content

    const rows = Math.ceil(moviesToShow.length / 5); // Assuming 5 movies per row

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('Movieslist-row1');

        for (let i = 0; i < 5; i++) {
            const movieIndex = row * 5 + i;
            if (movieIndex >= moviesToShow.length) break;

            const movie = moviesToShow[movieIndex];
            const movieBox = document.createElement('div');
            movieBox.classList.add('Movieslist-row1-box');

            const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

            movieBox.innerHTML = `
                <img src="${posterUrl}" alt="Movie Poster">
                <div class="Movies-name">
                    <p>${movie.title}</p>
                    <p>Release: ${movie.release_date}</p>
                </div>
            `;

            rowDiv.appendChild(movieBox);
        }

        moviesContainer.appendChild(rowDiv);
    }

    updatePagination(page, filteredMovies.length);
}

// Function to update pagination buttons
function updatePagination(currentPage, totalFilteredMovies) {
    const totalPages = Math.ceil(totalFilteredMovies / moviesPerPage);
    const paginationContainer = document.querySelector('.pages');
    paginationContainer.innerHTML = ''; // Clear existing buttons

    const prevButton = document.createElement('button');
    prevButton.classList.add('btnpage');
    prevButton.textContent = 'Prev';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMovies(currentPage, document.querySelector('#searchBox').value, getSelectedFilter());
        }
    });

    const nextButton = document.createElement('button');
    nextButton.classList.add('btnpage');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayMovies(currentPage, document.querySelector('#searchBox').value, getSelectedFilter());
        }
    });

    const pageCounter = document.createElement('div');
    pageCounter.classList.add('page-counter');
    pageCounter.textContent = `Page ${currentPage} of ${totalPages}`;

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
    paginationContainer.appendChild(pageCounter);
}

// Get selected filter type
function getSelectedFilter() {
    const selectedRadio = document.querySelector('input[name="media"]:checked');
    return selectedRadio ? selectedRadio.value : 'Movies';
}

// Disable input elements
function disableInputs(disabled) {
    document.querySelector('#searchBox').disabled = disabled;
    document.querySelector('button').disabled = disabled;
}

// Initialize movie loading and display
async function initializeMovies() {
    disableInputs(true);
    await loadAllMovies();
    displayMovies();
    disableInputs(false);
}

// Event listener for search
document.querySelector('#searchBox').addEventListener('input', debounce(() => {
    displayMovies(1, document.querySelector('#searchBox').value, getSelectedFilter());
}, 500));

// Event listener for filter change
document.querySelectorAll('input[name="media"]').forEach(radio => {
    radio.addEventListener('change', () => {
        displayMovies(1, document.querySelector('#searchBox').value, getSelectedFilter());
    });
});

// Debounce function to delay search
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialize the script
initializeMovies();
