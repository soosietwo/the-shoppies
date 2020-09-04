import React from "react";
import { ResourceList } from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";
import { NOMINEES_QUERY } from "./Sidebar";

const REMOVE_NOMINEE_MUTATION = gql`
  mutation REMOVE_NOMINEE_MUTATION(
    $id: ID!
    $title: String!
    $poster: String!
    $year: Int!
  ) {
    removeNominee(id: $id, title: $title, poster: $poster, year: $year) {
      id
      title
      poster
      year
    }
  }
`;

const NomineesList = (props) => {
  const { movies, totalResults, type, typePlural, actionText } = props;

  const [removeNominee, { loading, data, error }] = useMutation(
    REMOVE_NOMINEE_MUTATION,
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
            removeNominee({ variables: { id: movie.id } });
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
