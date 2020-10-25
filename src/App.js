import React from "react";

import Store from "./store";
import initialState from "./store/reducer";
import Home from "./components/Home";

function App() {
  return (
    <Store initialState={initialState}>
      <Home />
    </Store>
  );
}

export default App;
