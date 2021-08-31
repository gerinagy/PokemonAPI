import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../Features/pokemonState/pokemonSlice";
import {apiSlice} from "../Features/pokemons/pokemons-api-slice";




const store = configureStore({
    reducer: {
        states: pokemonSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState> 

export default store;