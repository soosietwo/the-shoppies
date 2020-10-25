import React from "react";
import { render, waitFor } from "../test-utils";
import Pagination from "../components/Pagination";
import { fireEvent } from "@testing-library/react/dist/pure";
import api from "../api";
import Store from "../store";

describe("Pagination", () => {
  it("renders and matches snapshot", () => {
    const mockInitialState = {
      currentPage: 1,
      totalResults: 10,
    };

    const { container } = render(
      <Store initialState={mockInitialState}>
        <Pagination />
      </Store>
    );

    expect(container.querySelector(".Polaris-Pagination")).toMatchSnapshot();
  });

  it("calls getMovies when you click next or previous ", async () => {
    const mockInitialState = {
      currentPage: 1,
      totalResults: 50,
    };

    const { container } = render(
      <Store initialState={mockInitialState}>
        <Pagination />
      </Store>
    );

    const getMoviesSpy = jest.spyOn(api, "getMovies");

    fireEvent.click(container.querySelector('[aria-label="Next"]'));

    await waitFor(() => {
      expect(getMoviesSpy).toHaveBeenCalledWith(undefined, 2);
    });

    fireEvent.click(container.querySelector('[aria-label="Previous"]'));

    await waitFor(() => {
      expect(getMoviesSpy).toHaveBeenCalledWith(undefined, 1);
    });
  });

  it("disables the previous button on the first page", async () => {
    const mockInitialState = {
      currentPage: 1,
      totalResults: 20,
    };

    const { container } = render(
      <Store initialState={mockInitialState}>
        <Pagination />
      </Store>
    );

    expect(container.querySelector('[aria-label="Previous"]')).toBeDisabled();
  });

  it("disables the next button on the last page", async () => {
    const mockInitialState = {
      currentPage: 5,
      totalResults: 50,
    };

    const { container } = render(
      <Store initialState={mockInitialState}>
        <Pagination />
      </Store>
    );

    expect(container.querySelector('[aria-label="Next"]')).toBeDisabled();
  });
});
