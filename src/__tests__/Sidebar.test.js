import React from "react";
import { render, waitFor } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Sidebar from "../components/Sidebar";
import { NOMINEES_QUERY } from "../components/Home";

const mockNominee = {
  id: "132",
  title: "test",
  poster: "123",
  year: 1234,
};

const mocks = [
  {
    request: { query: NOMINEES_QUERY },
    result: {
      data: {
        nominees: [mockNominee],
      },
    },
  },
];

describe("Sidebar", () => {
  it("renders and matches snapshot", async () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks}>
        <Sidebar sheetActive={true} nominees={[mockNominee]} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(baseElement.querySelector(".Polaris-Sheet")).toMatchSnapshot();
    });
  });

  it("displays the correct number of nominations", async () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks}>
        <Sidebar sheetActive={true} nominees={[mockNominee]} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        baseElement.querySelectorAll(".Polaris-ResourceItem")
      ).toHaveLength(1);
    });
  });
});
