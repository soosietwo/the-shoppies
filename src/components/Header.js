import React from "react";
import { TopBar } from "@shopify/polaris";
import SearchBar from "./SearchBar";

const Header = () => (
  <TopBar showNavigationToggle searchField={<SearchBar />} />
);

export default Header;
