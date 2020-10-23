import React from "react";
import { render } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import MovieCard from "../components/MovieCard";

const mockMovie = {
  title: "test",
  year: 1234,
  poster: "123",
  id: 132,
};

describe("MovieCard", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <MovieCard movie={mockMovie} nominees={[]} />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
