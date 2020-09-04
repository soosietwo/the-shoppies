import React from "react";
import { TopBar } from "@shopify/polaris";
import SearchBar from "./SearchBar";

import { gql, useQuery } from "@apollo/client";

export const NOMINEES_CONNECTION_QUERY = gql`
  query NOMINEES_CONNECTION_QUERY {
    nomineesConnection {
      aggregate {
        count
      }
    }
  }
`;

const Header = ({ toggleSheetActive, nomineesCount }) => {
  const { loading, error, data } = useQuery(NOMINEES_CONNECTION_QUERY);
  const count = data ? data.nomineesConnection.aggregate.count : 0;

  return (
    <TopBar
      showNavigationToggle
      searchField={<SearchBar />}
      secondaryMenu={
        <TopBar.Menu
          activatorContent={
            <span>
              Nominees
              <span
                style={{
                  padding: "5px 9px",
                  borderRadius: "50%",
                  background: "red",
                  color: "white",
                  marginLeft: "5px",
                  fontSize: "1.2rem",
                }}
              >
                {count}
              </span>
            </span>
          }
          onOpen={toggleSheetActive}
          onClose={toggleSheetActive}
        />
      }
    />
  );
};

export default Header;
