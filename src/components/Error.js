import React from "react";
import { Banner } from "@shopify/polaris";

// TODO: make this more user friendly and less scary
const Error = (props) => (
  <Banner status="critical" title={props.title}>
    <p>{props.details}</p>
  </Banner>
);

export default Error;
