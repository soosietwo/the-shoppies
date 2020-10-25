import React from "react";
import { render } from "../test-utils";
import Loader from "../components/Loader";

describe("Loader", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(<Loader />);

    expect(
      container.querySelector(".Polaris-ResourceList__ResourceListWrapper")
    ).toMatchSnapshot();
  });

  it("renders the correct number of cards", () => {
    const { container } = render(<Loader count={5} />);

    expect(
      container.querySelectorAll(".Polaris-ResourceItem__ListItem")
    ).toHaveLength(5);
  });
});
