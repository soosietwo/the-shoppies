import {
  FETCH_MOVIES,
  FETCH_NEXT,
  FETCH_PREVIOUS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  NOMINATE_MOVIE,
  REMOVE_NOMINEE,
} from "./constants";

const transformMovie = ({ imdbID, Poster, Year, Title }) => ({
  id: imdbID,
  poster: Poster,
  year: Number(Year),
  title: Title,
});

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        isLoading: true,
        error: null,
        totalResults: 0,
        searchTerm: action.searchTerm,
        currentPage: 1,
      };
    case FETCH_NEXT:
      return {
        ...state,
        isLoading: true,
        error: null,
        currentPage: state.currentPage + 1,
      };
    case FETCH_PREVIOUS:
      return {
        ...state,
        isLoading: true,
        error: null,
        currentPage: state.currentPage - 1,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.Search.map(transformMovie),
        totalResults: Number(action.payload.totalResults),
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        movies: [],
      };
    case NOMINATE_MOVIE:
      return {
        ...state,
        nominees: [...state.nominees, action.payload],
      };
    case REMOVE_NOMINEE:
      return {
        ...state,
        nominees: state.nominees.filter(
          (nominee) => nominee.imdbID !== action.payload.imdbID
        ),
      };
    default:
      return state;
  }
};

export default reducer;
