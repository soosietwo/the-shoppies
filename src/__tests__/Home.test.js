import React from "react";
import { render } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import Store from "../store";
import Home from "../components/Home";

describe("Home", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <Store>
          <Home />
        </Store>
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
