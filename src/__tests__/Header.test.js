import React from "react";
import { render, waitFor } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Header, { NOMINEES_CONNECTION_QUERY } from "../components/Header";
import Store from "../store";

const mocks = [
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

describe("Header", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Store>
          <Header />
        </Store>
      </MockedProvider>
    );

    expect(container.querySelector(".Polaris-TopBar")).toMatchSnapshot();
  });

  it("displays the correct number of nominees", async () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Store>
          <Header />
        </Store>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelector(".count")).toHaveTextContent("1");
    });
  });
});