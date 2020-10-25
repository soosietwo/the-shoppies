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
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Sidebar sheetActive={true} nominees={[mockNominee]} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  // it("displays the correct number of nominees", async () => {
  //   const { container } = render(
  //     <MockedProvider addTypename={false} mocks={mocks}>
  //       <Store>
  //         <Sidebar />
  //       </Store>
  //     </MockedProvider>
  //   );

  //   await waitFor(() => {
  //     expect(container.querySelector(".count")).toHaveTextContent("1");
  //   });
  // });
});
