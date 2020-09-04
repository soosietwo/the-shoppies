import React from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
} from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import { NOMINEES_QUERY } from "./Sidebar";
import { NOMINEES_CONNECTION_QUERY } from "./Header";

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

const MovieCard = (props) => {
  const {
    movie: { title, year, poster, id },
  } = props;

  const posterMarkup = (
    <img
      style={{ maxWidth: "100px" }}
      src={poster}
      alt={`Poster for ${title}`}
    />
  );

  const [deleteNominee, { loading, data, error }] = useMutation(
    DELETE_NOMINEE_MUTATION,
    {
      refetchQueries: [
        { query: NOMINEES_QUERY },
        { query: NOMINEES_CONNECTION_QUERY },
      ],
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
          disabled={loading}
          onClick={() => deleteNominee({ variables: { id } })}
        >
          {loading ? "Removing..." : "Remove"}
        </Button>
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
