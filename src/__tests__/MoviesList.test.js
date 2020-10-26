import React from "react";
import { render } from "../test-utils";
import MoviesList from "../components/MoviesList";

describe("MoviesList", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MoviesList
        movies={[{ title: "Test" }]}
        totalResults={1}
        singular="movie"
        plural="movies"
        renderItem={(movie) => <div>{movie.title}</div>}
        emptyStateTitle="Test empty state"
        emptyStateCaption="Test empty state caption"
      />
    );

    expect(
      container.querySelector(".Polaris-ResourceList__ResourceListWrapper")
    ).toMatchSnapshot();
  });

  it("renders empty state if no items are passed in", () => {
    const { container } = render(
      <MoviesList
        movies={[]}
        totalResults={0}
        singular="movie"
        plural="movies"
        renderItem={(movie) => <div>{movie.title}</div>}
        emptyStateTitle="Test empty state"
        emptyStateCaption="Test empty state caption"
      />
    );

    expect(
      container.querySelector(".Polaris-ResourceList__ResourceListWrapper")
    ).toMatchSnapshot();
  });
});
