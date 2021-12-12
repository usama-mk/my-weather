import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SVG from 'react-inlinesvg'
import celciusIcon from '../../../images/celcius2.svg'




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        width: '180px',
        height: '230px',
        background:'honeyDew'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize:'contain'
    }
}));


export const WeatherCard = (props)=>{

    const classes = useStyles();
    const{forecast}= props;
    const [dayForecast, setDayForecast] = useState(null);


    useEffect(()=>{
        if(forecast!==null)
            setDayForecast(forecast);
    },[forecast]);


    const getCelcius= fTemp =>{
        let cTemp= (fTemp - 32)* 5/9;
        cTemp= parseInt(cTemp | 0);
        return cTemp;
    };

    const getDayName = (date)=>{
        let d = new Date(date);
        let dayName = d.toString().split(' ')[0];
        return dayName;
    };

    const getDate= (date)=>{
        let d = new Date(date);
        return d.toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };
    return (
        <Card className={classes.root}>
            {dayForecast !== null ?
                <CardMedia
                    className={classes.media}
                    image={require(`../../../images/${dayForecast.Day.Icon}.png`)}
                    title="weather icon"
                />
                :
               ''
            }
            <CardContent>
                {dayForecast !==null ?
                    <>
                    <Typography variant="h6" color="textSecondary" component="p">
                        {getDayName(dayForecast.Date)}
                    </Typography>
                    <Typography style={{fontSize:'18px'}} color="textSecondary" component="p">
                        {getDate(dayForecast.Date)}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        {getCelcius(dayForecast.Temperature.Maximum.Value)}
                        <SVG src={celciusIcon} style={{marginLeft:'4px' ,width: '15px' , height:'15px' }}/>
                    </Typography>
                    </>
                    :
                    ''
                }
            </CardContent>


        </Card>
    );

};








