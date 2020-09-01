import React, { useCallback, useState, useContext } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Icon,
  Stack,
} from "@shopify/polaris";
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

  const handleSubmit = () => {
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
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Stack>
          <Stack.Item fill>
            <TextField
              label="Search for a movie title"
              labelHidden
              fill
              type="text"
              value={searchTerm}
              prefix={<Icon source={SearchMajorMonotone} />}
              onChange={handleSearchChange}
            />
          </Stack.Item>
          {/* <TextField
          label="Year"
          type="text"
          value={year}
          onChange={handleYearChange}
        /> */}
          <Button
            primary
            disabled={!searchTerm.trim().length}
            loading={state.isLoading}
            submit
          >
            Search movies
          </Button>
        </Stack>
      </FormLayout>
    </Form>
  );
}

export default SearchBar;
