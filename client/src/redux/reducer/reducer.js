const initialState = {
  pokemons: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return { ...state };
  }
}
