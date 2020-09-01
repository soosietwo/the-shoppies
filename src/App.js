import React from "react";

import Store from "./store";
import Home from "./components/Home";

function App() {
  return (
    <Store>
      <Home />
    </Store>
  );
}

export default App;
