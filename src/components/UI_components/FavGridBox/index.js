import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FavCityCard from './FavCityCard';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'left'
    },
    card: {
        position: 'relative',
        height: '350px',
        width: '240px'
    },
    cardBox:{
        position: 'relative',
        marginTop: '100px',
        padding:'0 0 0 10px'

    },
    control: {
        padding: theme.spacing(2),
    }

}));


function FavGridBox(props){

    const classes = useStyles();
    const[favCities, setFavCities]=useState(null);


    useEffect(()=>{
        if(localStorage.getItem('favCities') !== null)
            setFavCities(JSON.parse(localStorage.getItem('favCities')));

    },[]);


    return(
        <Grid container className={classes.root} spacing={2}>
            <Grid item className={classes.cardBox} xs={12}>
                <Grid container justifyContent="flex-start" style={{marginLeft:'30px'}} spacing={3}>
                    {favCities!== null && favCities!== undefined ? favCities.map((city, value ) => (
                            <Grid key={value} style={{padding:'10px'}} item>
                                <FavCityCard className={classes.card} city={city} setFavCities={setFavCities} />
                            </Grid>
                        ))
                        :
                        <Typography variant="h5" color="textSecondary" component="p">
                            No Favorite Cities
                        </Typography>
                    }
                </Grid>
            </Grid>

        </Grid>
    )
}
export default FavGridBox;