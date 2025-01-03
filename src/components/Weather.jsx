import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import { AiOutlineSearch } from 'react-icons/ai';

const Weather = () => {
    const inputRef = useRef()
    const[weatherData, setweatherData] = useState(false);
    const [tempCelsius, setTempCelsius] = useState(false);
  const [tempFahrenheit, setTempFahrenheit] = useState(false);

    const allIcons = {
        "01d" : 'src/assets/clear.png',
        "01n" : 'src/assets/clear.png',
        "02d" : 'src/assets/cloud.png',
        "02n" : 'src/assets/cloud.png',
        "03d" : 'src/assets/cloud.png',
        "03n" : 'src/assets/cloud.png',
        "04d" : 'src/assets/drizzle.png',
        "04n" : 'src/assets/drizzle.png',
        "09d" : 'src/assets/rain.png',
        "09n" : 'src/assets/rain.png',
        "010d" : 'src/assets/rain.png',
        "010n" : 'src/assets/rain.png',
        "013d" : 'src/assets/snow.png',
        "013n" : 'src/assets/snow.png',
    }
    const search = async (city) =>{
        if (city == ""){
            alert("Enter City Name First")
            return;
        }
        try{
          const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
          const response = await fetch(url);

          if(!response.ok){
            alert("Fill The City Correctly");
            return;
          }

          const data = await response.json();
          const celsius = Math.floor(data.main.temp);
          const fahrenheit = Math.floor((celsius * 9/5) + 32);
          setTempCelsius(celsius);
          setTempFahrenheit(fahrenheit);
        
          console.log(data);
          const icon = allIcons[data.weather[0].icon] ||  'src/assets/clear.png';
          setweatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temp_max: Math.floor(data.main.temp_max),
            temp_min: Math.floor(data.main.temp_min),
            description: (data.weather[0].main),
            location : data.name,
            icon: icon
          })
        } catch(error){
           setweatherData(false);
           setTempCelsius(false);
           setTempFahrenheit(false);
           console.error("Error in Fetching Weather Data")
        }
    }
    useEffect(()=>{
        search("");
    },[])
    
    return (
    <div className='Weather'>
       <div className='Search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' />
        <AiOutlineSearch className='search-icon' onClick={()=> search(inputRef.current.value)}/>
       </div>
       {weatherData? <>
        <img src={weatherData.icon} alt='' className='Weather-icon' />
        <p className='Temperature' > {tempCelsius}°C / {tempFahrenheit}°F</p>
       <p className='Description'>{weatherData.description}</p>
       <p className='Temperature_range'>H:{weatherData.temp_max}° L:{weatherData.temp_min}°</p>
       <p className='Location'>{weatherData.location}</p>

       <div className="Weather-data" >
        <div className='col'>
        <img src="src/assets/humidity.png" alt="" />
        <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
        </div>
        </div>
         
        <div className='col'>
        <img src="src/assets/wind.png" alt="" />
        <div>
            <p>{weatherData.windSpeed} km/hr</p>
            <span>Wind Speed</span>
        </div>
        </div>
        </div>
       </>:<></>}

    </div>
    )
}

export default Weather
