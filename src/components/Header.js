import React from "react";
import { TopBar } from "@shopify/polaris";
import SearchBar from "./SearchBar";

const Header = ({ toggleSheetActive, nomineesCount }) => (
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
              {nomineesCount}
            </span>
          </span>
        }
        onOpen={toggleSheetActive}
        onClose={toggleSheetActive}
      />
    }
  />
);

export default Header;
