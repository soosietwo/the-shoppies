import React, { useContext, useCallback, useState } from "react";
import { Page, Card, Frame, Banner } from "@shopify/polaris";

import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import Loader from "./Loader";
import Error from "./Error";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { Context } from "../store";

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [sheetActive, setSheetActive] = useState(false);
  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    []
  );

  return (
    <Frame
      topBar={
        <Header
          toggleSheetActive={toggleSheetActive}
          nomineesCount={state.nominees.length}
        />
      }
    >
      <Page title="The Shoppies">
        <Card>
          {state.isLoading && <Loader count={10} />}
          {state.nominees.length === 5 && (
            <Banner status="success" title="All done!" />
          )}
          {state.error && !state.isLoading ? (
            <Error title="Oops!" details={state.error} />
          ) : (
            <MoviesList
              singular="movie"
              plural="movies"
              movies={state.movies}
              totalResults={state.totalResults}
              renderItem={(movie) => <MovieCard movie={movie} />}
            />
          )}
          {state.totalResults > 10 && <Pagination />}
        </Card>

        <Sidebar
          nominees={state.nominees}
          toggleSheetActive={toggleSheetActive}
          sheetActive={sheetActive}
        />
      </Page>
    </Frame>
  );
};

export default Home;
