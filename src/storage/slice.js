import { createSlice } from '@reduxjs/toolkit'


const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState: {
        pokemons: []
    },
    reducers: {
        addPokemons: (state, action) => {
            state.pokemons = action.payload
        }
    }
})


export const {addPokemons} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;