import React,{useState,useEffect} from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import searchicon from "./images/search-icon.png";
import locationicon from "./images/location-icon.png";
// import weatherimage from "./images/cloudy-rainy.png";
import uparrow from "./images/uparrow.png";
import downarrow from './images/downarrow.png'
import humidityicon from './images/humidity-icon.png'
import windicon from './images/windy-icon.png'
import pressureicon from './images/cloudy-pressure.png'
// import rainyicon from './images/cloudy-rainy.png'

function App() {

  const[city,setcity] = useState("Chennai")
  const[darkMode,setDarkMode] =useState(false)
  const[celsius,setCelsius]=useState(true)
  const [currentData,setCurrentData] =useState([])
  const [forecastData,setForecastData] =useState([])

  const kelvinToCelsiusAndFahrenheit =(k) =>{
    var celsius = k - 273.15;
    var fahrenheit = (k - 273.15) * 9/5 + 32;
    return {
        celsius: `${Math.floor(celsius)}°C`,
        fahrenheit: `${Math.floor(fahrenheit)}°F`
  };
  }
  const getWeather = async()=>{
    const APIkey = "305134855ecc2bd40f2df0539493435a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`;
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIkey}`;
    await fetch(url).then((res)=>res.json()).then((data)=>{setCurrentData(data) });
    await fetch(forcastUrl).then((res)=>res.json()).then((data)=>{
      const forecastFilter = data?.list?.filter(i=>i?.dt_txt.includes("12:00:00"))
      setForecastData(forecastFilter) 
    });
  }
  useEffect(()=>{
      getWeather();


  },[city])
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };
  function getDayFromDate(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }
const renderValue=(value)=> {return <>{celsius ? kelvinToCelsiusAndFahrenheit(value).celsius:kelvinToCelsiusAndFahrenheit(value).fahrenheit}</> }
  return (
    <div className="App" style={{background:darkMode? 'black':'linear-gradient(white,aqua)'}}>

      <header className="App-header">
        <div>
           <h1>ReactWeather</h1>
        </div>
        <div>
         <Form>
           <Form.Check 
           type="switch"
           id="custom-switch"
           onChange={()=>{setDarkMode(!darkMode)}}
           />
         </Form>
       </div>
      </header>

      <div className='searchbar' style={{background:darkMode? '#d7d7d7' : 'white'}}>
        <img className='search-icon' src={searchicon} alt='search'></img>
        <input type='text' onChange={(e)=>{setcity(e.target.value)}} value={city}/>
        <img className='location-icon' src={locationicon} alt='location'></img>
      </div>
      
      <div className='current-weather' style={{background:darkMode? '#d7d7d7' : 'white'}}>

        <div className="current-weather-header">
           <div>
             <h1>Current Weather</h1>
           </div>
           <div>
            <p>{celsius? "C°":'°F'}</p>
             <Form>
             <Form.Check 
             value='celsius'
             type="switch"
             id="custom-switch"
             onChange={()=>{setCelsius(!celsius);}}
             />
             </Form>
           </div>
        </div>

        <div className='location-status-box' >
        <div className='location-status-box1'>
          <p className='para1'>{currentData?.name}</p>
          <div className='weather-statusbox'>
            <img className='weatherimage' src={getWeatherIconUrl(currentData?.weather && currentData?.weather[0]?.icon)} alt='weather'></img>
            <p className='para2'> {renderValue(currentData?.main?.temp)}</p>

          </div>
          <p className='para3'>{currentData?.weather && currentData?.weather[0]?.description}</p>

        </div>

        <div className='location-status-box2'>
          <p className='para1'>Feels like{renderValue(currentData?.main?.feels_like)}</p>
          <tr>
            <th><img id='weather-icons' src={uparrow} alt='up-arrow'></img>{renderValue(currentData?.main?.temp_max)}</th>
            <th><img id='down-arrow' src={downarrow} alt='down-arrow'></img>{renderValue(currentData?.main?.temp_min)}</th>
          </tr>
          <tr>
            <td><img id='weather-icons' src={humidityicon} alt='up-arrow' ></img>Humidity</td>
            <td >{currentData?.main?.humidity}</td>
          </tr>
          <tr>
            <td><img id='weather-icons' src={windicon} alt='up-arrow'></img>wind</td>
            <td>{Math.floor(currentData?.wind?.speed * 3.6)} Kph </td>
          </tr>
          <tr>
            <td><img id='weather-icons' src={pressureicon} alt='up-arrow'></img>Pressure</td>
            <td>{currentData?.main?.pressure} pa</td>
          </tr>

        </div>
        </div>
      </div>

      <div className='forecast' style={{background:darkMode? '#d7d7d7' : 'white'}}>
        <h1 className='forecast-para1'>Extended Forecast</h1>
        <div className='forecast-weeks-boxes'>
          {forecastData?.map(item=>(
                    <div key={item.dt} className='forecast-weeks-box'>
                    <p className='forecast-para2'>{getDayFromDate(item.dt_txt)}</p>
                    <img className='forecast-icons' src={getWeatherIconUrl(item?.weather && item?.weather[0]?.icon)} alt='weather-icons'></img>
                    <p className='forecast-para2'>{item?.weather && item?.weather[0]?.description}</p>
                    <p className='forecast-para2' >{renderValue(item?.main?.temp_max)}/{renderValue(item?.main?.temp_min)}</p>
                   </div>
          ))}


        </div>
      </div>
      <div style={{textAlign:'center',color:darkMode? "white" : ' rgb(7, 123, 123)'}}><u>Developed By Mohamed Anish</u></div>

    </div>
  );
}

export default App;
