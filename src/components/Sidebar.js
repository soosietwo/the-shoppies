import React, { useContext } from "react";
import { Sheet, Heading, Button, Scrollable } from "@shopify/polaris";
import { MobileCancelMajorMonotone } from "@shopify/polaris-icons";

import MoviesList from "./MoviesList";
import { Context } from "../store";
import { REMOVE_NOMINEE } from "../store/constants";

const Sidebar = ({ nominees, toggleSheetActive, sheetActive }) => {
  const [state, dispatch] = useContext(Context);

  const removeNominee = (movie) => {
    dispatch({ type: REMOVE_NOMINEE, payload: movie });
  };

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
            movies={nominees}
            type="nominee"
            typePlural="nominees"
            action={removeNominee}
            actionText={"Remove"}
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
