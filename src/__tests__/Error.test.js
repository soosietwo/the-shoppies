import React from "react";
import { render } from "../test-utils";
import Error from "../components/Error";

describe("Error", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <Error title="Test title" details="Test details" />
    );

    expect(container.querySelector(".Polaris-Banner")).toMatchSnapshot();
  });
});
