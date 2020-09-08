import React from "react";
import { ResourceList } from "@shopify/polaris";

import EmptyState from "./EmptyState";

const MoviesList = (props) => {
  const {
    movies,
    totalResults,
    singular,
    plural,
    renderItem,
    emptyStateTitle,
    emptyStateCaption,
  } = props;

  return (
    <ResourceList
      emptyState={
        <EmptyState
          movies={movies}
          emptyStateTitle={emptyStateTitle}
          emptyStateCaption={emptyStateCaption}
        />
      }
      resourceName={{ singular, plural }}
      items={movies}
      renderItem={(movie) => renderItem(movie)}
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
