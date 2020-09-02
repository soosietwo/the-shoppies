import React, { useContext } from "react";
import {
  Page,
  Layout,
  Card,
  Heading,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Banner,
} from "@shopify/polaris";

import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import Error from "./Error";
import { Context } from "../store";
import { NOMINATE_MOVIE, REMOVE_NOMINEE } from "../store/constants";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  const nominateMovie = (movie) => {
    dispatch({ type: NOMINATE_MOVIE, payload: movie });
  };

  const removeNominee = (movie) => {
    dispatch({ type: REMOVE_NOMINEE, payload: movie });
  };

  const isNominateButtonDisabled = (movie) => {
    return (
      state.nominees.some((nominee) => movie.imdbID === nominee.imdbID) ||
      state.nominees.length >= 5
    );
  };

  return (
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
        <Layout.Section secondary>
          <Card sectioned>
            <Heading element="h2">Nominees</Heading>
            <MoviesList
              movies={state.nominees}
              type="nominee"
              typePlural="nominees"
              action={removeNominee}
              actionText={"Remove"}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
