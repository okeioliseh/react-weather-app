import React, { useState } from 'react'
import  { fetchWeather } from './fetchWeather.js'

const Layout = () => {
	const [query,setQuery] = useState("")
	const [weather,setWeather] = useState({})

	const searchCity = async (event) =>{
		if(event.key === "Enter"){
			const data = await fetchWeather(query);
			setQuery("");
			setWeather(
				{
					name : data.data.name,
					temp : data.data.main.temp,
					country : data.data.sys.country,
					description : data.data.weather[0].description,
					icon : data.data.weather[0].icon,
				});
		}
	}

	return(
		<>	
			<div className = "main-container">
				<input value = {query} onChange = {(event) => setQuery(event.target.value)} onKeyPress = {searchCity} id = "search_input" type = "text" placeholder = "Search City..."/>
				{weather.name && (
					<div className = "city">
				    	<h2 className = "city-name">
				    		<span>{weather.name}</span>
				    		<sup>{weather.country}</sup>
				    	</h2>

				    	<div className = "city-temp">
				    		{Math.round(weather.temp)}
							<sup>&deg;C</sup>
				    	</div>

				    	<div className = "info">
				    		<img src = {`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt = "weather"/>
				    		<p>{weather.description}</p>
				    	</div>
				    </div>
				)}
			</div>
		</>
	)	
}

export default Layout		