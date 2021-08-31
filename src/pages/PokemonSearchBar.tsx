import React from 'react'
import { Typography, Button, CircularProgress, CardMedia, Card, CardActionArea, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Pokemon, useFetchPokemonsQuery } from '../Features/pokemons/pokemons-api-slice';
import { search, queryChange } from '../Features/pokemonState/pokemonSlice';
import { logo } from '../config';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '30ch',
            },
        },
        container: {
            height: '100vh',
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'linear-gradient(45deg, #FE6BEB, #FF8E53)',

        },
        pokeName: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        circularProgress: {
            margin: "10px"
        },
        button: {
            background: '#2F5C76',
            border: 2,
            borderRadius: 20,
            color: "white",
        },
        card: {
            maxWidth: 345,
            margin: 20,
            backgroundColor: 'transparent',
            boxShadow: 'none'
        },
        media: {
            width: 180,
            paddingTop: '56.25%', // 16:9
            backgroundSize: 'contain',
        },
        cardRoot: {
            maxWidth: 345,
            backgroundColor: "rgba(255, 202, 0, 0.56)",
            border: "5px solid white"
        },
        pokeMedia: {
            height: 140,
        },

    }));


function PokemonSearchBar() {
    const classes = useStyles();

    const pokemon = useAppSelector((state) => state.states)
    const dispatch = useAppDispatch();
    const { data, isFetching, isError } = useFetchPokemonsQuery(pokemon.query);


    function onQueryChange(pokeId: string) {
        dispatch(queryChange(pokeId))
    }
    function onSearch(data: Pokemon) {
        dispatch(search(data))
    }

    // console.log(data?.sprites.front_default)
    // console.log(pokemon)


    return (
        <>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={logo}
                        title="PokeAPI"
                    />
                </Card>
                <Typography
                    variant="h6">
                    Search for Pokemon
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        error={Boolean(isError)}
                        id="outlined-search"
                        label="Pokemon ID"
                        type="number"
                        variant="outlined"
                        onChange={(e) => onQueryChange(e.target.value)}
                        helperText={Boolean(isError) && "Put a number between 1 and 898"}
                    />
                </form>
                {isFetching ?
                    (<CircularProgress
                        className={classes.circularProgress} />) :
                    <Button
                        className={classes.button}
                        variant="contained"
                        onClick={() => onSearch}
                    >Search</Button>}
                <div className={classes.pokeName}>
                    <Typography
                        variant="h6">
                        Pokemon
                    </Typography>
                </div>
                        { data?.id &&
                <Card className={classes.cardRoot}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.pokeMedia}
                            image={data?.sprites.front_default}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data?.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>  
            }

                {isError &&
                    <Typography variant="h6">
                        Something went wrong
                    </Typography>}
            </div>
        </>
    );
}


export default PokemonSearchBar;