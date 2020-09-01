import React from "react";
import { ResourceList } from "@shopify/polaris";

import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";

const MoviesList = (props) => {
  const {
    movies,
    totalResults,
    type,
    typePlural,
    action,
    disableAction,
    actionText,
  } = props;

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular: type, plural: typePlural }}
      items={movies}
      renderItem={(movie) => (
        <MovieCard
          movie={movie}
          action={action}
          disableAction={disableAction}
          actionText={actionText}
        />
      )}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
