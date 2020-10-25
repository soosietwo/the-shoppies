import React from "react";
import { render, fireEvent, waitFor } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { ApolloConsumer } from "@apollo/client";
import NomineeCard, {
  DELETE_NOMINEE_MUTATION,
} from "../components/NomineeCard";
import { NOMINEES_QUERY } from "../components/Home";
import { NOMINEES_CONNECTION_QUERY } from "../components/Header";

const mockNominee = {
  id: "132",
  title: "test",
  poster: "123",
  year: 1234,
};

const mockMutationResult = jest.fn(() => ({
  data: {
    deleteNominee: {
      ...mockNominee,
    },
  },
}));

const mocks = [
  {
    request: { query: NOMINEES_QUERY },
    result: {
      data: {
        nominees: [mockNominee],
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
    request: {
      query: DELETE_NOMINEE_MUTATION,
      variables: { id: "132" },
    },
    result: mockMutationResult,
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
            count: 0,
          },
        },
      },
    },
  },
];

describe("NomineeCard", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <NomineeCard movie={mockNominee} nominees={[]} />
      </MockedProvider>
    );

    expect(container.querySelector(".Polaris-ResourceItem")).toMatchSnapshot();
  });

  it("can remove movie from nominees", async () => {
    let apolloClient;

    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client;
            return <NomineeCard movie={mockNominee} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await apolloClient.query({ query: NOMINEES_QUERY });
    await apolloClient.query({ query: NOMINEES_CONNECTION_QUERY });

    fireEvent.click(getByText("Remove"));

    await waitFor(() => {
      expect(mockMutationResult).toHaveBeenCalled();
    });
  });
});
