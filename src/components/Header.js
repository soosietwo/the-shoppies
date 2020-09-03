import React, { useState, useCallback } from "react";
import { TopBar } from "@shopify/polaris";
import SearchBar from "./SearchBar";

const Header = ({ toggleSheetActive, sheetActive }) => (
  <TopBar
    showNavigationToggle
    searchField={<SearchBar />}
    secondaryMenu={
      <TopBar.Menu
        activatorContent={<span>Nominees</span>}
        onOpen={toggleSheetActive}
        onClose={toggleSheetActive}
      />
    }
  />
);

export default Header;
