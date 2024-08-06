import React, { useState } from 'react'

export default function WeatherApp() {

  // for storing the input field data
  let [city,setCity] = useState('');

  // for storing perticular search city details 
  let [weatherDetails,setWeatherDetails] = useState();

  // Website : openweathermap.org/api
  // API Key : 8a9ef250e6ff0c38d2b211a54d0169ac
  // Units : metric (temp in celsius)

  const searchData = (event) => {
    
    // console.log(city)
    
    if(city!==''){  // it prevent from error when user submit empty input

      // fetch the api data
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a9ef250e6ff0c38d2b211a54d0169ac&units=metric`)
      .then((res)=>res.json())  // it store the response in res and convert into json formate
      .then((finalRes)=>{       // it store the final response in finalRes
        // console.log(finalRes.cod);
        if(finalRes.cod == '404'){  // it handle the error when user enter wrong entry
          setWeatherDetails(undefined);  // it goes to undefind
        } else {
          setWeatherDetails(finalRes);   // it store the city details in weatherDetails state 
        }
    })
    } else {
      alert(`Please Enter City Name...`); // when user submit the empty entry it shows the pop up
    }
    
    event.preventDefault();   // it prevent the default form submission behavior
    setCity('');    // it clear the input field after search
  }

  return (
    <div className='bg-[#D0BEC2] w-[100%] h-[100vh]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px]'>Simple Whether App</h1>

        <form onSubmit={searchData}>
          <input type='text' placeholder='Enter City Name' className='w-[300px] h-[40px] pl-3' value={city} onChange={(event)=>setCity(event.target.value)}/> <button className='bg-[#683C47] text-white w-[70px] h-[40px]'>Search</button>
        </form>

        <div className='w-[500px] h-[250px] mx-auto bg-[#8B5B66] shadow-2xl mt-[40px] p-[25px] relative'>

          {
            weatherDetails !== undefined 
            ?
            <>
              <h3 className='font-bold text-[30px] relative'>City : {weatherDetails.name}
                <span className='absolute top-0 right-0 bg-white p-2 text-[20px]'>{weatherDetails.sys.country}</span> </h3>
              <h2 className='font-bond text-[40px]'>
              Temp : {weatherDetails.main.temp}
              </h2>
              <img src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`}/>
              <h1 className='mt[0px] p-[10px] text-[30px]'>Description : {weatherDetails.weather[0].description}</h1>
            </>
            :
            <h3 className='text-center font-bold text-[40px] mt-[60px]'>No Data Found</h3>
          }
        
        </div>
      </div>
    </div>
  )
}
