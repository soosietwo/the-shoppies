import React, { useCallback, useState, useContext, useEffect } from "react";
import { TopBar } from "@shopify/polaris";
import { SearchMajorMonotone } from "@shopify/polaris-icons";

import api from "../api";
import { Context } from "../store";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../store/constants";

function SearchBar(props) {
  const [state, dispatch] = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");

  const handleSearchChange = useCallback((value) => setSearchTerm(value), []);
  const handleYearChange = useCallback((value) => setYear(value), []);

  useEffect(() => {
    if (searchTerm.trim().length) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    dispatch({ type: FETCH_MOVIES, searchTerm });

    api
      .getMovies(searchTerm, year, 1)
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
  };
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
