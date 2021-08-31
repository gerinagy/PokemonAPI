import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemons/pokemons-api-slice";

export interface PokemonState {
    query: string
    status: "IDLE" | "LOADING" | "FAILED",
    pokemon?: Pokemon
}

const initialState: PokemonState = {
    query: "",
    status: "IDLE",

}

const pokemonSlice = createSlice({
    name: 'pokemonState',
    initialState,
    reducers: {
        queryChange(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        search(state, action: PayloadAction<Pokemon>) {
            state.pokemon = action.payload
        },
    }
})

export const { queryChange, search } = pokemonSlice.actions
export default pokemonSlice.reducer