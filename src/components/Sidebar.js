import React, { useState } from "react";
import {
  Sheet,
  Heading,
  Button,
  Scrollable,
  Toast,
  Banner,
} from "@shopify/polaris";
import { MobileCancelMajor } from "@shopify/polaris-icons";
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

  const [deleteAllNominees, { loading }] = useMutation(
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
      optimisticResponse: {
        __typename: "Mutation",
        deleteAllNominees: {
          count: 5,
          __typename: "BatchPayload",
        },
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
            icon={MobileCancelMajor}
            onClick={toggleSheetActive}
            plain
          />
        </div>
        {nominees.length === 5 && (
          <Banner status="success" title="All done!">
            <p>You have chosen 5 nominees. Submit or remove them.</p>
          </Banner>
        )}
        <Scrollable style={{ height: "100%" }}>
          <MoviesList
            singular="nominee"
            plural="nominees"
            movies={nominees}
            emptyStateTitle="No nominees yet"
            emptyStateCaption="Choose five of your favourite movies to nominate!"
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
          <Button
            disabled={nominees.length !== 5}
            loading={loading}
            primary
            onClick={deleteAllNominees}
          >
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
