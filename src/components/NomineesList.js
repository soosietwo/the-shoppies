import React from "react";
import { ResourceList } from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";
import { NOMINEES_QUERY } from "./Sidebar";

const DELETE_NOMINEE_MUTATION = gql`
  mutation DELETE_NOMINEE_MUTATION($id: ID!) {
    deleteNominee(id: $id) {
      id
      title
      poster
      year
    }
  }
`;

const NomineesList = (props) => {
  const { movies, totalResults } = props;

  const [deleteNominee, { loading, data, error }] = useMutation(
    DELETE_NOMINEE_MUTATION,
    {
      refetchQueries: [{ query: NOMINEES_QUERY }],
    }
  );

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular: "nominee", plural: "nominees" }}
      items={movies}
      renderItem={(movie) => (
        <MovieCard
          movie={movie}
          action={() => {
            deleteNominee({ variables: { id: movie.id } });
          }}
          actionText="Remove"
        />
      )}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default NomineesList;
