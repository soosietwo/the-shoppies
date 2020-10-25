import React, { useCallback, useState, useContext, useEffect } from "react";
import { TopBar } from "@shopify/polaris";

import api from "../api";
import { Context } from "../store";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../store/constants";

const useDebouncedEffect = (effect, delay, deps) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

function SearchBar(props) {
  const [state, dispatch] = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = useCallback((value) => setSearchTerm(value), []);
  const handleSearch = () => {
    if (searchTerm.trim().length) {
      dispatch({ type: FETCH_MOVIES, searchTerm });

      api
        .getMovies(searchTerm, 1)
        .then(({ Error, Search, totalResults }) => {
          if (Error) {
            dispatch({ type: FETCH_MOVIES_FAILURE, payload: Error });
          } else {
            dispatch({
              type: FETCH_MOVIES_SUCCESS,
              payload: { Search, totalResults },
            });
          }
        })
        .catch((error) =>
          dispatch({ type: FETCH_MOVIES_FAILURE, payload: error })
        );
    }
  };

  useDebouncedEffect(() => handleSearch(), 500, [searchTerm]);

  return (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchTerm}
      placeholder="Search"
      showFocusBorder
    />
  );
}

export default SearchBar;
