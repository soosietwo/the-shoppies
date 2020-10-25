import React, { createContext, useReducer } from "react";
import reducer, { initialState as defaultInitialState } from "./reducer";

const Store = ({ children, initialState = defaultInitialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(defaultInitialState);
export default Store;
