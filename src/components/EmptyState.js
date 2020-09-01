import React from "react";
import { EmptyState } from "@shopify/polaris";

const EmptyStateMessage = (movies) => {
  return !movies.length ? (
    <EmptyState
      heading="No movies found"
      action=""
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>Search to get started!</p>
    </EmptyState>
  ) : undefined;
};

export default EmptyStateMessage;
