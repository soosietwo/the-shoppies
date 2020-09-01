import React from "react";
import { Frame } from "@shopify/polaris";

import Store from "./store";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <Store>
      <Frame topBar={<Header />}>
        <Home />
      </Frame>
    </Store>
  );
}

export default App;
