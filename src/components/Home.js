import React, { useContext, useCallback, useState } from "react";
import { Page, Card, Frame, Banner } from "@shopify/polaris";
import { gql, useQuery } from "@apollo/client";

import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import Loader from "./Loader";
import Error from "./Error";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { Context } from "../store";

export const NOMINEES_QUERY = gql`
  query NOMINEES_QUERY {
    nominees {
      id
      title
      poster
      year
    }
  }
`;

const Home = () => {
  const [state] = useContext(Context);
  const [sheetActive, setSheetActive] = useState(false);
  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    []
  );

  const { loading, error, data } = useQuery(NOMINEES_QUERY);

  return (
    <Frame topBar={<Header toggleSheetActive={toggleSheetActive} />}>
      <Page>
        <Card>
          {state.error && !state.isLoading && (
            <Error title="Oops! Something went wrong" details={state.error} />
          )}

          {data && data.nominees.length === 5 && (
            <Banner
              status="success"
              title="All done!"
              action={{
                content: "Go to nominees",
                onAction: () => toggleSheetActive(true),
              }}
            >
              <p>You have chosen 5 nominees. Submit or remove them.</p>
            </Banner>
          )}

          {state.isLoading || loading ? (
            <Loader count={10} />
          ) : (
            <MoviesList
              singular="movie"
              plural="movies"
              movies={state.movies}
              totalResults={state.totalResults}
              emptyStateTitle="No movies found"
              emptyStateCaption="Start typing in your favourite movie titles to get started!"
              renderItem={(movie) => (
                <MovieCard
                  movie={movie}
                  nominees={(data && data.nominees) || []}
                  toggleSheetActive={toggleSheetActive}
                />
              )}
            />
          )}

          {state.totalResults > 10 && <Pagination />}
        </Card>

        <Sidebar
          nominees={(data && data.nominees) || []}
          toggleSheetActive={toggleSheetActive}
          sheetActive={sheetActive}
        />
      </Page>
    </Frame>
  );
};

export default Home;
