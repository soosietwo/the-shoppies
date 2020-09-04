import React from "react";
import { ResourceList } from "@shopify/polaris";

import NomineeCard from "./NomineeCard";
import EmptyState from "./EmptyState";

const NomineesList = (props) => {
  const { movies, totalResults } = props;

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular: "nominee", plural: "nominees" }}
      items={movies}
      renderItem={(movie) => (
        <NomineeCard
          movie={movie}
          // action={() => {
          //   deleteNominee({ variables: { id: movie.id } });
          // }}
          actionText="Remove"
        />
      )}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default NomineesList;
