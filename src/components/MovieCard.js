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
    movie: { title, year, poster, id },
  } = props;

  const posterMarkup = (
    <img
      style={{ maxWidth: "100px" }}
      src={poster}
      alt={`Poster for ${title}`}
    />
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

        {action && (
          <Button
            disabled={disableAction && disableAction(props.movie)}
            onClick={action}
          >
            {actionText}
          </Button>
        )}
      </TextContainer>
    </ResourceItem>
  );
};

export default MovieCard;
