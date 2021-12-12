import React, {useState, useEffect} from 'react';
import SVG from 'react-inlinesvg'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {WeatherCard} from './WeatherCard';
import Toast from '../../helpers/toast';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import celciusIcon from '../../../images/celcius2.svg'
import DeleteIcon from '@material-ui/icons/Delete';
import dayPic from "../../../images/dayPic.jpg";
import nightPic from '../../../images/nightPic.jpg';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        width: '70%',
        minHeight: '600px',
        left:'50%',
        transform: 'translateX(-50%)',
        border: '0.3px solid lightgray',
        borderRadius:'25px',
        boxShadow: '1px 1px lightgray',
        background:'beige'
    },
    card: {
        position: 'relative',
        height: '350px',
        width: '240px'
    },
    cardBox:{
        position: 'relative',
        marginTop: '8vh'
    },
    upperLeftPatch:{
        position: 'relative',
        display:'flex',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        width: '380px',
        height: '255px',
        paddingTop:'3%'

    },
    control: {
        padding: theme.spacing(2)
    },
    favButton:{
        position:'relative',
        borderRadius:'20px 20px 0 20px'
    },
    weatherText:{
        position:'relative',
        top:'240px',
        right:'275px'

    }
}));


const GridBoxes = props =>{
  const classes=useStyles();
  const {city, forecast, currentWeather}= props;
  const [currentCity, setCurrentCity]= useState('');
  const [dailyForecast, setDailyForecast]= useState(null);
  const [isInFav, setIsInFav]= useState(false);
  const [dayTime, setDayTime]= useState(true);

    useEffect(()=>{
        if(city!=='') {
            setCurrentCity(city);
            setIsInFav(checkInFav(city));
        }
    },[city]);

    useEffect(()=>{
        if(currentWeather!==null){
            setDayTime(currentWeather.IsDayTime);
        }

    },[currentWeather]);

    useEffect(()=>{
        if(forecast!==null)
            setDailyForecast(forecast.DailyForecasts);
    },[forecast]);


//favorites the city, using local storage for persistance of data
    const handleAddFavorite = (city) =>{
        if(localStorage.getItem('favCities')===null){
            let favCities=[];
            favCities.push(city);
            localStorage.setItem('favCities', JSON.stringify(favCities));
            setIsInFav(true);
            Toast.success('City Added Successfully');
        }
        else{
            let favCities = JSON.parse(localStorage.getItem('favCities'));
            favCities.push(city);
            localStorage.setItem('favCities', JSON.stringify(favCities));
            setIsInFav(true);
            Toast.success('City Added Successfully');

        }
    };

    // checks if city is available in favorites
    const checkInFav=(currentCity)=>{
        if(localStorage.getItem('favCities')!==null) {
            let favCities = JSON.parse(localStorage.getItem('favCities'));
            return favCities.filter(city => city === currentCity).length === 1;
        }
        else return false;
    };

    // delete city from favorites
    const handleDeleteFavorite = () =>{
        let favCities = JSON.parse(localStorage.getItem('favCities'));
        favCities = favCities.filter(city => city !== currentCity );
        localStorage.setItem('favCities', JSON.stringify(favCities));
        setIsInFav(false);
        Toast.success('City Deleted Successfully');
    };

    // get date and time
    const getDayDateName = (date)=>{
        let d = new Date(date);
        let dayName = d.toString().split(' ')[0];
        return dayName+' '+ d.toLocaleDateString();
    };

    const isDayTime =()=>{
        if(currentWeather!==null){
            console.log(currentWeather);
            if(currentWeather.IsDayTime) {
                return `url(${dayPic})`;
            }
            else {
                return `url(${nightPic})`;
            }
            }
    };

  return(
      <Grid container className={classes.root}  spacing={2}>
          <div style={{display:'flex', justifyContent:'flex-end', width:'100%', maxHeight:'40px'}}>
              { isInFav ?
                  <Button variant="contained" onClick={() => handleDeleteFavorite()} style={{backgroundColor:' #ff3333'}} className={classes.favButton}>
                      <DeleteIcon/>
                      <Typography   style={{marginLeft: '4px', color:'#fff', fontSize:'12px'}} component="p">
                          Remove From Favorites
                      </Typography>
                  </Button>
                  :
                  <Button variant="contained" style={{backgroundColor:' #00cc00'}} onClick={() => handleAddFavorite(currentCity)} className={classes.favButton} >
                      <FavoriteIcon />
                      <Typography variant="button" color="textSecondary"  style={{marginLeft: '4px',  color:'#fff', fontSize:'14px'}} component="p">
                          Add To Favorites
                      </Typography>
                  </Button>
              }
          </div>
          <div className={classes.upperLeftPatch} style={{backgroundImage:currentWeather!==null ? isDayTime(): 'none'}}>
              {currentWeather !== null ?
                  <div>
                      <img style={{height:'70px' ,width:'120px'}} src={require(`../../../images/${currentWeather.WeatherIcon}.png`)} alt={'weatherIcon'}/>
                  </div>
                  :
                  ''
              }
              <div >
              <Typography variant="h4" style={{color: dayTime ? 'rgba(0, 0, 0, 0.54)': '#fff'}}  component="p">
                  {currentCity}
              </Typography>
              <Typography variant="h5" style={{marginTop:'4px', color: dayTime ? 'rgba(0, 0, 0, 0.54)': '#fff'}}  component="p">
                  {currentWeather!==null ? getDayDateName(currentWeather.LocalObservationDateTime) : ''}
              </Typography>
              <Typography variant="h5" style={{marginTop:'10px', color: dayTime ? 'rgba(0, 0, 0, 0.54)': '#fff'}} component="p">
                  {currentWeather !== null ? parseInt(currentWeather.Temperature.Metric.Value):''}
                  <SVG src={celciusIcon} style={{marginLeft:'4px' ,width: '15px' , height:'15px',fill: dayTime ? 'rgba(0, 0, 0, 0.54)': '#fff'}}/>
              </Typography>
              <Typography variant="h6"  style={{marginLeft:'2px', marginTop:'4vh', color: dayTime ? 'rgba(0, 0, 0, 0.54)': '#fff'}} component="p">
                  {currentWeather !== null ? currentWeather.WeatherText : ''}
              </Typography>
              </div>
          </div>
          <Grid item className={classes.cardBox} xs={12}>
              <Grid container justifyContent="center" spacing={3}>
                  {dailyForecast!== null && dailyForecast!== undefined ? dailyForecast.map((forecast, value ) => (
                          <Grid key={value} style={{padding:'8px 8px 60px 8px'}} item>
                              <WeatherCard className={classes.card} forecast={forecast}/>
                          </Grid>
                      ))
                  :
                      <Typography variant="h5" color="textSecondary" component="p">
                          No Data
                      </Typography>
                  }
              </Grid>
          </Grid>
      </Grid>
  )


};
export default withRouter(GridBoxes);