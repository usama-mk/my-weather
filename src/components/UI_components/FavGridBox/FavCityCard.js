import React, {useState,useEffect} from 'react';
import {getCurrentWeather} from "../../Weather_API";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SVG from "react-inlinesvg";
import celciusIcon from "../../../images/celcius2.svg";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Toast from "../../helpers/toast";



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth:'400px',
        width: '180px',
        height: '230px',
        padding: '0 0 14px 0',
        cursor: 'pointer'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    upperLeftPatch:{
        position: 'relative',
        marginLeft: '10%',
        marginTop: '5%',
        maxWidth: '300px'

    }

}));



function FavCityCard(props){
    const classes=useStyles();
    const {city, setFavCities}=props;
    const [currentWeather, setCurrentWeather]= useState(null);

    useEffect(()=>{
        if(city!==undefined)
            getCityWeather(city);

    },[city]);

  const getCityWeather = (city)=>{
        getCurrentWeather(city)
            .then(data=>{
                if(data.Code==='ServiceUnavailable')
                    Toast.error( data.Message);
                else
                    setCurrentWeather(data)})
            .catch(err=> Toast.error(err))
    };

    const handleDeleteFavorite = (e) =>{
        e.stopPropagation();
        let favCities = JSON.parse(localStorage.getItem('favCities'));
        favCities = favCities.filter(currentCity => city !== currentCity );
        localStorage.setItem('favCities', JSON.stringify(favCities));
        setFavCities(favCities);
        Toast.success('City Deleted Successfully');
    };

    const handleOnClick=()=>{
        props.history.push({
            pathname: '/',
            cityFromFav: city,
        });
    };

    return(

        <Card className={classes.root} onClick={()=>handleOnClick()}>

            {currentWeather !== null ?
                <CardMedia
                    className={classes.media}
                    image={require(`../../../images/${currentWeather.WeatherIcon}.png`)}
                    title="weather icon"
                />
                :
               ''
            }
            <CardContent>
                <div className={classes.upperLeftPatch}>
                    <div style={{maxWidth:'300px'}}>
                    <Typography variant="h5" color="textSecondary" component="p">
                        {city!== null ? city :''}
                    </Typography>
                    <Typography variant="h5" style={{marginTop:'10px'}} color="textSecondary" component="p">
                        {currentWeather !== null ? parseInt(currentWeather.Temperature.Metric.Value):''}
                        <SVG src={celciusIcon} style={{marginLeft:'4px' ,width: '15px' , height:'15px' }}/>
                    </Typography>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={(e)=> handleDeleteFavorite(e)} >
                        <DeleteIcon />
                    </Button>
                </div>
            </CardContent>

        </Card>
    )
}
export default withRouter(FavCityCard);


