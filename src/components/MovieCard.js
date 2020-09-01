import React from "react";
import {
  Heading,
  Subheading,
  Button,
  ResourceItem,
  TextContainer,
} from "@shopify/polaris";

const MovieCard = (props) => {
  const {
    disableAction,
    actionText,
    action,
    movie: { Title, Year, Poster, imdbID },
  } = props;
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
        {action && (
          <Button
            disabled={disableAction && disableAction(props.movie)}
            onClick={() => action(props.movie)}
          >
            {actionText}
          </Button>
        )}
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
