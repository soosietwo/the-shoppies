import React from "react";
import { render, waitFor, fireEvent } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Sidebar, { DELETE_ALL_NOMINEES_MUTATION } from "../components/Sidebar";
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
    deleteAllNominees: {
      count: 5,
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
    request: { query: DELETE_ALL_NOMINEES_MUTATION },
    result: mockMutationResult,
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

  it("disables the submit button if there are less than 5 nominees", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Sidebar sheetActive={true} nominees={[mockNominee]} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText("Submit Nominees").closest("button")).toBeDisabled();
    });
  });

  it("displays a banner if there are 5 nominees and can submit", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Sidebar
          sheetActive={true}
          nominees={Array(5)
            .fill("")
            .map(() => mockNominee)}
        />
      </MockedProvider>
    );

    expect(
      getByText("You have chosen 5 nominees. Submit or remove them.")
    ).toBeVisible();

    fireEvent.click(getByText("Submit Nominees").closest("button"));

    await waitFor(() => {
      expect(mockMutationResult).toHaveBeenCalled();
    });
  });
});
