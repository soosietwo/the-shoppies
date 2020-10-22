import React, { useState } from "react";
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

  const [showToast, setShowToast] = useState(false);

  const posterMarkup = (
    <img
      style={{ maxWidth: "100px" }}
      src={poster}
      alt={`Poster for ${title}`}
    />
  );

  const [addNominee, { loading }] = useMutation(ADD_NOMINEE_MUTATION, {
    update(cache, { error }) {
      if (error) return console.error(error);

      const nomineesQuery = cache.readQuery({ query: NOMINEES_QUERY });
      const nominees = [
        ...nomineesQuery.nominees,
        { title, year, poster, id, __typename: "Nominee" },
      ];
      cache.writeQuery({
        query: NOMINEES_QUERY,
        data: { ...nomineesQuery, nominees },
      });

      const nomineesConnectionQuery = cache.readQuery({
        query: NOMINEES_CONNECTION_QUERY,
      });
      const prevCount =
        nomineesConnectionQuery.nomineesConnection.aggregate.count;
      cache.writeQuery({
        query: NOMINEES_CONNECTION_QUERY,
        data: {
          nomineesConnection: {
            __typename: "NomineeConnection",
            aggregate: {
              __typename: "AggregateNominee",
              count: prevCount + 1,
            },
          },
        },
      });

      setShowToast(true);
    },
    optimisticResponse: {
      __typename: "Mutation",
      addNominee: {
        __typename: "Nominee",
        title,
        year,
        poster,
        id,
      },
    },
  });

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
          disabled={
            loading ||
            nominees.some((nominee) => nominee.id === id) ||
            nominees.length >= 5
          }
          onClick={() => addNominee({ variables: { title, year, poster, id } })}
        >
          {showToast || nominees.some((nominee) => nominee.id === id)
            ? "Nominated!"
            : loading
            ? "Adding..."
            : "Add nominee"}
        </Button>
      </TextContainer>
      {showToast ? (
        <Toast
          content={nominees.length === 5 ? "All done! " : "Nominee added!"}
          onDismiss={() => setShowToast(false)}
          duration={nominees.length === 5 ? 10000 : 2000}
          action={
            nominees.length === 5 && {
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
