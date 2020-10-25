import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

const Store = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
