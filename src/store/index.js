import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  movies: [],
  isLoading: false,
  currentPage: 1,
  error: null,
  totalResults: 0,
  nominations: []
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
