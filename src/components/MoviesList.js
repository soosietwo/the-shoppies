import React from "react";
import { ResourceList } from "@shopify/polaris";

import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";

const MoviesList = (props) => {
  const { movies, totalResults } = props;

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular: "movie", plural: "movies" }}
      items={movies}
      renderItem={(movie) => <MovieCard movie={movie} />}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
