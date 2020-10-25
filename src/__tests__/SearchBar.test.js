import React from "react";
import { render, waitFor } from "../test-utils";
import SearchBar from "../components/SearchBar";
import { fireEvent } from "@testing-library/react/dist/pure";
import api from "../api";
import Store from "../store";

describe("SearchBar", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <Store>
        <SearchBar />
      </Store>
    );

    expect(container).toMatchSnapshot();
  });

  it("calls getMovies with search term on submit", async () => {
    const mockInitialState = {
      currentPage: 1,
      totalResults: 0,
    };

    const { container } = render(
      <Store initialState={mockInitialState}>
        <SearchBar />
      </Store>
    );

    const getMoviesSpy = jest.spyOn(api, "getMovies");

    fireEvent.change(container.querySelector("#PolarisSearchField1"), {
      target: { value: "test" },
    });

    await waitFor(() => {
      expect(getMoviesSpy).toHaveBeenCalledWith("test", 1);
    });
  });
});
