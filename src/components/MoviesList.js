import React from "react";
import {
  ResourceList,
  EmptyState,
} from "@shopify/polaris";

import MovieCard from "./MovieCard";

const MoviesList = (props) => {
  const { movies, totalResults, type, typePlural, action, disableAction } = props;

  const emptyStateMarkup = !movies.length ? (
    <EmptyState
      heading="No movies found"
      action=""
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>Search to get started!</p>
    </EmptyState>
  ) : undefined;

  return (
    <ResourceList
      emptyState={emptyStateMarkup}
      resourceName={{ singular: type, plural: typePlural }}
      items={movies}
      renderItem={(movie) => <MovieCard movie={movie} action={action} disableAction={disableAction}/>}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
