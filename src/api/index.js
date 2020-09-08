const getMovies = async (searchTerm, year, page = 1) => {
  let url = `https://www.omdbapi.com/?apikey=${
    process.env.REACT_APP_API_KEY
  }&type=movie&s=${searchTerm.trim()}&page=${page}`;

  if (year) {
    url = url.concat(`&y=${year}`);
  }

  return (await fetch(url)).json();
};

export default {
  getMovies,
};
