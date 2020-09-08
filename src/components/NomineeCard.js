import React from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
} from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import { NOMINEES_QUERY } from "./Home";
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

const NomineeCard = (props) => {
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

  const [deleteNominee, { loading }] = useMutation(DELETE_NOMINEE_MUTATION, {
    refetchQueries: [
      { query: NOMINEES_QUERY },
      { query: NOMINEES_CONNECTION_QUERY },
    ],
    update(cache, { data: { deleteNominee } }) {
      cache.modify({
        fields: {
          nominees(existingNominees = [], { readField }) {
            return [...existingNominees].filter(
              (nomineeRef) => readField("id", nomineeRef) !== deleteNominee.id
            );
          },
        },
      });
    },
  });

  return (
    <ResourceItem
      id={id}
      media={posterMarkup}
      accessibilityLabel={`View details for ${title}`}
      verticalAlignment="center"
    >
      <TextContainer>
        <Heading>{title}</Heading>
        <Subheading>{year}</Subheading>
        <Button
          destructive
          disabled={loading}
          onClick={() => deleteNominee({ variables: { id } })}
        >
          {loading ? "Removing..." : "Remove"}
        </Button>
      </TextContainer>
    </ResourceItem>
  );
};

export default NomineeCard;
