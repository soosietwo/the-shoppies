import React from "react";
import { Banner } from "@shopify/polaris";

const Error = ({ title, details }) => (
  <Banner status="critical" title={title}>
    <p>{details}</p>
  </Banner>
);

export default Error;
