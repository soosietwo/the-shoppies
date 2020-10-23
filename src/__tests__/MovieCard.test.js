import React from "react";
import { render, fireEvent } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { ApolloConsumer } from "@apollo/client";
import MovieCard, { ADD_NOMINEE_MUTATION } from "../components/MovieCard";
import { NOMINEES_QUERY } from "../components/Home";
import { NOMINEES_CONNECTION_QUERY } from "../components/Header";
import { waitFor } from "@testing-library/react";

const mockMovie = {
  id: "132",
  title: "test",
  poster: "123",
  year: 1234,
};

const mocks = [
  {
    request: {
      query: ADD_NOMINEE_MUTATION,
      variables: { ...mockMovie },
    },
    result: {
      data: {
        addNominee: {
          __typename: "Nominee",
          ...mockMovie,
        },
      },
    },
  },
  {
    request: { query: NOMINEES_QUERY },
    result: {
      data: {
        nominees: [],
      },
    },
  },
  {
    request: { query: NOMINEES_CONNECTION_QUERY },
    result: {
      data: {
        nomineesConnection: {
          aggregate: {
            count: 1,
          },
        },
      },
    },
  },
  {
    request: { query: NOMINEES_QUERY },
    result: {
      data: {
        nominees: [
          {
            ...mockMovie,
            __typename: "Nominee",
          },
        ],
      },
    },
  },
  {
    request: { query: NOMINEES_CONNECTION_QUERY },
    result: {
      data: {
        nomineesConnection: {
          aggregate: {
            count: 1,
          },
        },
      },
    },
  },
];

describe("MovieCard", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <MovieCard movie={mockMovie} nominees={[mocks]} />
      </MockedProvider>
    );

    expect(container.querySelector(".Polaris-ResourceItem")).toMatchSnapshot();
  });

  it("adds a movie as a nominee", async () => {
    let apolloClient;

    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client;
            return <MovieCard movie={mockMovie} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await apolloClient.query({ query: NOMINEES_QUERY });
    await apolloClient.query({ query: NOMINEES_CONNECTION_QUERY });

    fireEvent.click(getByText("Add nominee"));

    await apolloClient.query({ query: NOMINEES_QUERY });
    await apolloClient.query({ query: NOMINEES_CONNECTION_QUERY });

    await waitFor(() => {
      expect(getByText("Nominated!")).toBeVisible();
    });
  });
});
