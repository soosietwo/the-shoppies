import React from "react";
import { ResourceList } from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";
import { NOMINEES_QUERY } from "./Sidebar";
import { NOMINEES_CONNECTION_QUERY } from "./Header";

const ADD_NOMINEE_MUTATION = gql`
  mutation ADD_NOMINEE_MUTATION(
    $id: ID!
    $title: String!
    $poster: String!
    $year: Int!
  ) {
    addNominee(id: $id, title: $title, poster: $poster, year: $year) {
      id
      title
      poster
      year
    }
  }
`;

const MoviesList = (props) => {
  const { movies, totalResults } = props;

  const [addNominee, { loading, data, error }] = useMutation(
    ADD_NOMINEE_MUTATION,
    {
      refetchQueries: [
        { query: NOMINEES_QUERY },
        { query: NOMINEES_CONNECTION_QUERY },
      ],
    }
  );

  return (
    <ResourceList
      emptyState={<EmptyState movies={movies} />}
      resourceName={{ singular: "movie", plural: "movies" }}
      items={movies}
      renderItem={(movie) => (
        <MovieCard
          movie={movie}
          action={() => {
            addNominee({ variables: { ...movie } });
          }}
          // disableAction={disableAction}
          actionText="Nominate"
        />
      )}
      showHeader
      totalItemsCount={totalResults}
    />
  );
};

export default MoviesList;
