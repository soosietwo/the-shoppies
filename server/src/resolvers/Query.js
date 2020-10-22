const axios = require("axios");

const movies = async (parent, args) => {
  const { searchTerm, page } = args;
  const url = "https://www.omdbapi.com";

  return axios
    .get(url, {
      params: {
        apikey: process.env.API_KEY,
        type: "movie",
        s: searchTerm.trim(),
        page,
      },
    })
    .then((res) => {
      const movies = res.data.Search.map((movie) => ({
        title: movie.Title,
        year: movie.Year,
        id: movie.imdbID,
        poster: movie.Poster,
      }));

      return { movies, totalResults: res.data.totalResults };
    })
    .catch((err) => console.log(err.response.data.Error));
};

const nominees = async (parent, args, context) => {
  return await context.prisma.nominees();
};

const nomineesConnection = async (parent, args, context) => {
  const aggregate = await context.prisma.nomineesConnection().aggregate();
  return { aggregate };
};

module.exports = {
  movies,
  nominees,
  nomineesConnection,
};
