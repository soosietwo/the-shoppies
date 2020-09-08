import React, { useState, useEffect } from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
  Toast,
} from "@shopify/polaris";
import { gql, useMutation } from "@apollo/client";

import { NOMINEES_QUERY } from "./Home";
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
    nominees,
    toggleSheetActive,
  } = props;

  const [isNominated, setIsNominated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (nominees.some((nominee) => nominee.id === id)) {
      setIsNominated(true);
    }
  }, [nominees, id]);

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
      update(cache, { data: { addNominee }, error }) {
        if (error) return console.error(error);

        setShowToast(true);
        cache.modify({
          fields: {
            nominees(existingNominees = []) {
              const newNomineeRef = cache.writeFragment({
                data: addNominee,
                fragment: gql`
                  fragment NewNominee on Todo {
                    id
                    title
                    year
                    poster
                  }
                `,
              });
              return [...existingNominees, newNomineeRef];
            },
          },
        });
      },
    }
  );

  return (
    <ResourceItem
      id={id}
      media={posterMarkup}
      accessibilityLabel={`View details for ${title}`}
      className="nominated"
      verticalAlignment="center"
    >
      <TextContainer>
        <Heading>{title}</Heading>
        <Subheading>{year}</Subheading>
        <Button
          disabled={loading || isNominated || nominees.length >= 5}
          onClick={() => addNominee({ variables: { title, year, poster, id } })}
        >
          {loading ? "Adding..." : isNominated ? "Nominated!" : "Add nominee"}
        </Button>
      </TextContainer>
      {showToast ? (
        <Toast
          content={nominees.length === 5 ? "All done! " : "Nominee added!"}
          onDismiss={() => setShowToast(false)}
          duration={nominees.length === 5 ? 10000 : 2000}
          action={
            nominees.length == 5 && {
              content: "See nominees",
              onAction: () => toggleSheetActive(true),
            }
          }
        />
      ) : null}
    </ResourceItem>
  );
};

export default MovieCard;
