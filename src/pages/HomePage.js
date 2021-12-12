import React, { useState,useEffect } from 'react';

import styles from './assets/Styles.module.css';
import Toast from '../components/helpers/toast';
import UpperMenu from '../components/UI_components/UpperMenu';
import SearchBar from "../components/UI_components/SearchBar";
import GridBoxes from '../components/UI_components/HomeGridBox';

import {getForecasts, getCurrentWeather} from '../components/Weather_API';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCity } from '../store/actions';




function HomePage (props){

    const {cityFromFav}=props.history.location;
    const [forecast, setForecast]= useState(null);
    const [currentWeather, setCurrentWeather]= useState(null);
    const city= useSelector(state=> state.city)
    const dispatch= useDispatch()

    // on component initialization get the city forecast and current weather
    useEffect(()=>{
        onGetForecast(city);
        onGetCurrentWeather(city);

    },[city]);

    useEffect(()=>{
        if(cityFromFav !== undefined) {
            dispatch(setCity(cityFromFav))
        }
    },[cityFromFav, dispatch]);

    //gets selected city forecast data
    const onGetForecast = (city)=>{
          getForecasts(city)
              .then(data=>{
                  if(data.Code==='ServiceUnavailable' || data === '')
                      Toast.error(data.Message);
                  else{
                      setForecast(data);
                  }})
            .catch(err=> Toast.error(err))
    };

    //gets current data of the selected city
    const onGetCurrentWeather = (city)=>{
        getCurrentWeather(city)
            .then(data=>{
                if(data.Code === 'ServiceUnavailable')
                    Toast.error(data.Message);
                else{
                    setCurrentWeather(data)
                }})
            .catch(err=> Toast.error(err))
    };


    return (
        <div >
            {/* Header */}
            <UpperMenu/>
            {/* search bar for searching cities */}
            <div className={styles.searchBar}>
                <SearchBar/>
            </div>
            {/* show weather details */}
            <div className={styles.gridBox}>
                <GridBoxes forecast={forecast} currentWeather={currentWeather} city={city} />
            </div>
         </div>
    )
}
export default HomePage;