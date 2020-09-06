import React from "react";
import { ResourceList } from "@shopify/polaris";

import EmptyState from "./EmptyState";

const MoviesList = (props) => {
  const { movies, totalResults, singular, plural, renderItem } = props;

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular, plural }}
      items={movies}
      renderItem={(movie) => renderItem(movie)}
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
