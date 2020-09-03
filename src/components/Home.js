import React, { useContext, useCallback, useState } from "react";
import {
  Page,
  Layout,
  Card,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Frame,
  Banner,
} from "@shopify/polaris";

import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import Error from "./Error";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Context } from "../store";
import { NOMINATE_MOVIE } from "../store/constants";

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const nominateMovie = (movie) => {
    dispatch({ type: NOMINATE_MOVIE, payload: movie });
  };

  const [sheetActive, setSheetActive] = useState(false);
  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    []
  );

  const isNominateButtonDisabled = (movie) => {
    return (
      state.nominees.some((nominee) => movie.imdbID === nominee.imdbID) ||
      state.nominees.length >= 5
    );
  };

  return (
    <Frame
      topBar={
        <Header
          toggleSheetActive={toggleSheetActive}
          sheetActive={sheetActive}
        />
      }
    >
      <Page title="The Shoppies">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              {state.isLoading && (
                <Card sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </Card>
              )}
              {state.nominees.length === 5 && (
                <Banner status="success" title="All done!" />
              )}
              {state.error && !state.isLoading ? (
                <Error title="Oops!" details={state.error} />
              ) : (
                <MoviesList
                  movies={state.movies}
                  totalResults={state.totalResults}
                  type="movie"
                  typePlural="movies"
                  action={nominateMovie}
                  disableAction={isNominateButtonDisabled}
                  actionText={"Nominate"}
                />
              )}
              {state.totalResults > 10 && <Pagination />}
            </Card>
          </Layout.Section>
        </Layout>
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
