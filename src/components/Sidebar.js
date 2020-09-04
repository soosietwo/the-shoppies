import React, { useContext } from "react";
import { Sheet, Heading, Button, Scrollable } from "@shopify/polaris";
import { MobileCancelMajorMonotone } from "@shopify/polaris-icons";
import { gql, useQuery } from "@apollo/client";

import NomineesList from "./NomineesList";

export const NOMINEES_QUERY = gql`
  query NOMINEES_QUERY {
    nominees {
      id
      title
      poster
      year
    }
  }
`;

const Sidebar = ({ toggleSheetActive, sheetActive }) => {
  const { loading, error, data } = useQuery(NOMINEES_QUERY);

  return (
    <Sheet open={sheetActive}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid #DFE3E8",
            display: "flex",
            justifyContent: "space-between",
            padding: "1.6rem",
            width: "100%",
          }}
        >
          <Heading>Your nominations</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajorMonotone}
            onClick={toggleSheetActive}
            plain
          />
        </div>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Scrollable style={{ height: "100%" }}>
            <NomineesList movies={data.nominees} />
          </Scrollable>
        )}
        <div
          style={{
            alignItems: "center",
            borderTop: "1px solid #DFE3E8",
            display: "flex",
            justifyContent: "space-between",
            padding: "1.6rem",
            width: "100%",
          }}
        >
          <Button onClick={toggleSheetActive}>Cancel</Button>
          <Button primary onClick={toggleSheetActive}>
            Submit Nominees
          </Button>
        </div>
      </div>
    </Sheet>
  );
};

export default Sidebar;
