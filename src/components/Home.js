import React, { useContext, useCallback, useState } from "react";
import {
  Page,
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
