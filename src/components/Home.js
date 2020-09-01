import React, { useContext } from "react";
import {
  Page,
  Layout,
  Card,
  Heading,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";

import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import Error from "./Error";
import { Context } from "../store";
import { NOMINATE_MOVIE } from "../store/constants";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const nominateMovie = (movie) => {
    dispatch({ type: NOMINATE_MOVIE, payload: movie });
  };

  const isNominateButtonDisabled = (movie) => {
    return (
      state.nominations.some((nominee) => movie.imdbID === nominee.imdbID) ||
      state.nominations.length >= 5
    );
  };

  return (
    <Page title="The Shoppies">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SearchBar />
            {state.isLoading && (
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            )}
            {state.error ? (
              <Error title="Oops!" details={state.error} />
            ) : (
              <MoviesList
                movies={state.movies}
                totalResults={state.totalResults}
                type="movie"
                typePlural="movies"
                action={nominateMovie}
                disableAction={isNominateButtonDisabled}
              />
            )}

            {state.totalResults > 10 && <Pagination />}
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading element="h2">Nominees</Heading>
            <MoviesList
              movies={state.nominations}
              type="movie"
              typePlural="movies"
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
