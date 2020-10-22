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
    optimisticResponse: {
      __typename: "Mutation",
      deleteNominee: {
        __typename: "Nominee",
        title,
        year,
        poster,
        id,
      },
    },
    update(cache, { error, data }) {
      if (error) return console.error(error);

      const nomineesQuery = cache.readQuery({ query: NOMINEES_QUERY });
      const nominees = [
        ...nomineesQuery.nominees.filter(
          (nominee) => data.deleteNominee.id !== nominee.id
        ),
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
              count: prevCount - 1,
            },
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
