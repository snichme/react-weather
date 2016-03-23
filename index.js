import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import { render as renderToDom} from 'react-dom'
import _ from 'lodash'

import Navigation from './components/Navigation'
import Weather from './components/Weather'

require("./style.scss")

const APP_ID = "<ENTER_YOUR_APPID_HERE>"

const state = {
  query: "",
  weatherData: {}
}

const fetchWeatherData = () => {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${state.query}&appid=${APP_ID}`
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${state.query}&mode=json&appid=${APP_ID}`
  
  return Promise.all([
    fetch(weatherUrl).then((response) => response.json()), 
    fetch(forecastUrl).then((response) => response.json())
  ]).then(function(values) {
    let [weather, forecast] = values
    return  Object.assign({}, weather, forecast);
  });
}

const onSearch = (value) => {
  state.query = value;
  state.weatherData = {};

  fetchWeatherData().then((res) => {
    state.weatherData = res;
  }).then(renderProgram)
}

const renderProgram = () => {
  renderToDom(
    <div>
      <Navigation query={state.query} onSearch={onSearch}/>
      <Weather data={state.weatherData} />
    </div>,
    document.getElementById("app")
  )
}
renderProgram()
