import Toast from '../helpers/toast';

const key='PkVGgltw5cIb6E9DDfqTZQAYcsbB1dfa';


    const getCity = async (city) => {
        let response;
        const base = `https://dataservice.accuweather.com/locations/v1/cities/search`;
        const query = `?apikey=${key}&q=${city}`;
        try {
            response = await fetch(base + query);
            if(response.Code==='ServiceUnavailable'){
                Toast.error(response.Message);
                return null;
            }
            else{
                const data = await response.json();
                return data[0].Key;
            }
        }
        catch(err){
            Toast.error("Get City Weather API problem");
        }
    };


    const get5DayForecast = async (city) => {
        let response= null;
        let id = 0;
        try {
            id = await getCity(city);
        }
        catch(err){
            Toast.error('Weather API problem')
        }
        const base = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
        const query = `${id}?apikey=${key}`;
        try {
            response = await fetch(base + query);
            if(response.Code==='ServiceUnavailable'){
                Toast.error(response.Message);
                return null;
            }
            else{
                const data = await response.json();
                return data;
            }
        }
        catch(err){
            Toast.error("5 Day Forecast Weather API problem");
        }

    };



   export const getCurrentWeather = async (city) => {
        let response= null;
        let id = await getCity(city);
        const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
        const query = `${id}?apikey=${key}`;
       try {
           response = await fetch(base + query);
           if(response.Code==='ServiceUnavailable'){
               Toast.error( response.Message);
               return null;
           }
           else{
               const data = await response.json();
               return data[0];
           }
       }
       catch(err){
          Toast.error("Current Weather API problem");
       }
    };


export async function getForecasts(city){
    let forecast='=';
   await get5DayForecast(city)
        .then(data=> forecast=data)
        .catch(err=> console.log(err));

    return forecast;

}


 export const AutoCompleteSearch = async(text)=>{
    let response = null;
    const base= `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`;
    const query= `?apikey=${key}&q=${text}`;
     try {
         response = await fetch(base + query);
         if(response.Code==='ServiceUnavailable'){
             Toast.error(response.Message);
             return null;
         }
         else{
             const data = await response.json();
             return data;
         }
     }
     catch(err){
         Toast.error("Autocomplete Weather API problem");
     }
};
