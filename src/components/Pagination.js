import React, { useContext } from "react";
import { Pagination } from "@shopify/polaris";

import { Context } from "../store";
import api from "../api";
import {
  FETCH_NEXT,
  FETCH_PREVIOUS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../store/constants";

const PaginationComponent = () => {
  const [state, dispatch] = useContext(Context);
  const totalPages = Math.ceil(state.totalResults / 10);

  const getPage = (page) => {
    dispatch({ type: page > state.currentPage ? FETCH_NEXT : FETCH_PREVIOUS });
    api
      .getMovies(state.searchTerm, null, page)
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
      .catch((error) => {
        dispatch({ type: FETCH_MOVIES_FAILURE, payload: error });
      });
  };

  return (
    <Pagination
      label={`Page ${state.currentPage} of ${totalPages}`}
      hasPrevious={state.currentPage > 1}
      onPrevious={() => {
        getPage(state.currentPage - 1);
      }}
      hasNext={state.currentPage < totalPages}
      onNext={() => {
        getPage(state.currentPage + 1);
      }}
    />
  );
};

export default PaginationComponent;
