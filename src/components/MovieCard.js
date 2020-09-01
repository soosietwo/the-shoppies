import React from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
} from "@shopify/polaris";

const MovieCard = (props) => {
  const { Title, Year, Poster, imdbID } = props.movie;
  const poster = (
    <img
      style={{ maxWidth: "100px" }}
      src={Poster}
      alt={`Poster for ${Title}`}
    />
  );

  return (
    <ResourceItem
      id={imdbID}
      media={poster}
      accessibilityLabel={`View details for ${Title}`}
    >
      <TextContainer>
        <Heading>{Title}</Heading>
        <Subheading>{Year}</Subheading>
        {props.action && (
          <Button
            disabled={props.disableAction(props.movie)}
            onClick={() => props.action(props.movie)}
          >
            Nominate
          </Button>
        )}
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
