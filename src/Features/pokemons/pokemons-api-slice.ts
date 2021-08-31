import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CUSTOMER_SERVICE_SERVER } from "../../config";


export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string
    }
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: CUSTOMER_SERVICE_SERVER,
    }),
    endpoints(builder) {
        return {
            fetchPokemons: builder.query<Pokemon, string|void>({
                query( pokeId ) {
                    return `/${pokeId}`;
                },
            }),
        };
    },
});

export const { useFetchPokemonsQuery } = apiSlice;