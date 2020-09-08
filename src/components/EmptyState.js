import React from "react";
import { EmptyState, Card } from "@shopify/polaris";

const EmptyStateMessage = ({
  movies,
  emptyStateTitle = "No movies found",
  emptyStateCaption = "Search to get started!",
}) => {
  return !movies.length ? (
    <Card>
      <EmptyState
        heading={emptyStateTitle}
        image="https://www.iconarchive.com/download/i99782/designbolts/free-multimedia/Film.ico"
      >
        <p>{emptyStateCaption}</p>
      </EmptyState>
    </Card>
  ) : undefined;
};

export default EmptyStateMessage;
