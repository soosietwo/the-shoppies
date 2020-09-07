import React from "react";
import { Sheet, Heading, Button, Scrollable } from "@shopify/polaris";
import { MobileCancelMajorMonotone } from "@shopify/polaris-icons";

import MoviesList from "./MoviesList";
import NomineeCard from "./NomineeCard";

const Sidebar = ({ toggleSheetActive, sheetActive, nominees }) => {
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
        <Scrollable style={{ height: "100%" }}>
          <MoviesList
            singular="nominee"
            plural="nominees"
            movies={nominees}
            renderItem={(movie) => <NomineeCard movie={movie} />}
          />
        </Scrollable>
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
