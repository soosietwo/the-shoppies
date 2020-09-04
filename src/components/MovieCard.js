import React, { useState, useEffect } from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
} from "@shopify/polaris";
import { gql, useMutation, useApolloClient } from "@apollo/client";

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

const MovieCard = (props) => {
  const {
    movie: { title, year, poster, id },
  } = props;

  const [isNominated, setIsNominated] = useState(false);

  const client = useApolloClient();
  const { nominees } = client.readQuery({
    query: gql`
      query NOMINEES_QUERY {
        nominees {
          id
          title
          poster
          year
        }
      }
    `,
  });

  useEffect(() => {
    if (nominees.some((nominee) => nominee.id === id)) {
      setIsNominated(true);
    }
  }, [nominees]);

  const posterMarkup = (
    <img
      style={{ maxWidth: "100px" }}
      src={poster}
      alt={`Poster for ${title}`}
    />
  );

  const [addNominee, { loading, data, error }] = useMutation(
    ADD_NOMINEE_MUTATION,
    {
      refetchQueries: [
        { query: NOMINEES_QUERY },
        { query: NOMINEES_CONNECTION_QUERY },
      ],
      update: (store, { data }) => {
        setIsNominated(data.addNominee.id === id);
      },
    }
  );

  return (
    <ResourceItem
      id={id}
      media={posterMarkup}
      accessibilityLabel={`View details for ${title}`}
    >
      <TextContainer>
        <Heading>{title}</Heading>
        <Subheading>{year}</Subheading>
        <Button
          disabled={loading || isNominated}
          onClick={() => addNominee({ variables: { title, year, poster, id } })}
        >
          {loading ? "Adding..." : isNominated ? "Nominated" : "Add nominee"}
        </Button>
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
