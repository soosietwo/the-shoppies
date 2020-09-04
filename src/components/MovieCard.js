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
    disableAction,
    actionText,
    action,
    movie: { title, year, poster, id },
  } = props;

  const posterMarkup = (
    <img
      style={{ maxWidth: "100px" }}
      src={poster}
      alt={`Poster for ${title}`}
    />
  );

  const [
    addNominee,
    { loading, data, error },
  ] = useMutation(ADD_NOMINEE_MUTATION, {
    refetchQueries: [{ query: NOMINEES_QUERY }],
  });

  return (
    <ResourceItem
      id={id}
      media={posterMarkup}
      accessibilityLabel={`View details for ${title}`}
    >
      <TextContainer>
        <Heading>{title}</Heading>
        <Subheading>{year}</Subheading>

        {action && (
          <Button
            disabled={disableAction && disableAction(props.movie)}
            onClick={() => {
              const variables = {
                id,
                poster,
                year,
                title,
              };

              addNominee({ variables });
            }}
          >
            {actionText}
          </Button>
        )}
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
