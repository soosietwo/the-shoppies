import React from "react";
import { render } from "../test-utils";
import EmptyState from "../components/EmptyState";

describe("EmptyState", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(<EmptyState movies={[]} />);

    expect(container.querySelector(".Polaris-EmptyState")).toMatchSnapshot();
  });
});
