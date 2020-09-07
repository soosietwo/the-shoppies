import React, { useState } from "react";
import { Sheet, Heading, Button, Scrollable, Toast } from "@shopify/polaris";
import { MobileCancelMajorMonotone } from "@shopify/polaris-icons";
import { gql, useMutation } from "@apollo/client";

import MoviesList from "./MoviesList";
import NomineeCard from "./NomineeCard";
import { NOMINEES_QUERY } from "./Home";
import { NOMINEES_CONNECTION_QUERY } from "./Header";

const DELETE_ALL_NOMINEES_MUTATION = gql`
  mutation DELETE_ALL_NOMINEES_MUTATION {
    deleteAllNominees {
      count
    }
  }
`;

const Sidebar = ({ toggleSheetActive, sheetActive, nominees }) => {
  const [showToast, setShowToast] = useState(false);

  const [deleteAllNominees, { loading, data, error }] = useMutation(
    DELETE_ALL_NOMINEES_MUTATION,
    {
      refetchQueries: [
        { query: NOMINEES_QUERY },
        { query: NOMINEES_CONNECTION_QUERY },
      ],
      update(cache, { data, error }) {
        if (error) return console.error(error);
        if (data) setShowToast(true);
      },
    }
  );

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
          <Button loading={loading} onClick={toggleSheetActive}>
            Cancel
          </Button>
          <Button loading={loading} primary onClick={deleteAllNominees}>
            Submit Nominees
          </Button>
        </div>
      </div>
      {showToast ? (
        <Toast
          content="Nominees Submitted!"
          onDismiss={() => setShowToast(false)}
        />
      ) : null}
    </Sheet>
  );
};

export default Sidebar;
