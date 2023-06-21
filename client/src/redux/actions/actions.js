const initialState = {
  pokemons: [],
};

export default function rootReducer(state = initialState, payload) {
  switch (type) {
    case ERROR:
      return "An error has ocurred";

    default:
      return { ...state };
  }
}
