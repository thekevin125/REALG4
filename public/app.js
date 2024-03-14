const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');

async function loadMovies() {
    const response = await fetch('/peliculas');
    const movies = await response.json();
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.titulo} (${movie.año}) - ${movie.genero} - ${movie.director}`;
        movieList.appendChild(li);
    });
}

// Cargar las películas al cargar la página
loadMovies();

// Manejar la acción de enviar el formulario de película
movieForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(movieForm);
    const movieData = Object.fromEntries(formData.entries());
    await fetch('/peliculas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
    });
    movieForm.reset();
    loadMovies();
});