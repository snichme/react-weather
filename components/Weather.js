import React from 'react'
import _ from 'lodash'

import Chart from './Chart'

const kelvinToCelcius = (t) => (
  Math.round(t - 273.15)
)

// Simple formatting so we dont need to pull in a date formatting library
const onlyTime = (date) => {
  let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()

  return `${hours}:${minutes}:${seconds}`
}

const generateChartConfig = (data) => {
  let fields = {
    "x": (item) => item.dt*1000,
    "Temperature": (item) => kelvinToCelcius(_.get(item, "main.temp")),
    "Wind": "wind.speed",
    "Pressure": "main.pressure"
  }
  let list = _.filter(_.drop(data.list, 4), (item, index) => index % 8 === 0)

  let charData = _.map(fields, (field, title) => {
    let a = _.map(list, field)
    return [title, ...a]
  })

  return {
    data: {
      x: 'x',
      columns: charData,
      types: {
        "Temperature": 'line',
        "Wind": 'line',
        "Pressure": 'area-step'
      },
      axes: {
        "Pressure": 'y2'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%y-%m-%d',
          fit: true
        }
      },
      y: {
        tick: {
          format: d3.format("s")
        }
      },
      y2: {
        show: true,
        tick: {
          format: d3.format("s")
        }
      }
    },
    tooltip: {
      format: {
        value: function (value, ratio, id) {
          if(id === "Wind") {
            return value + " m/s"
          }
          if(id === "Temperature") {
            return value + " °C"
          }
          let format = d3.format(",")
          return format(value);
        }
      }
    }
  }
}


const ForecastDetails = ({details}) => {

  // Filter out only forecast for 12:00 every day.
  // Forecast should just give a hint on the upcoming weather,
  // show one for each day is enough and doesn't create an to long list
  let list = _.filter(_.drop(details, 4), (item, index) => index % 8 === 0)

  return (
      <ul className="collection">
      {_.map(list, (data) => (
        <li key={data.dt} className="collection-item avatar">
          <img src={"http://openweathermap.org/img/w/"+data.weather[0].icon+".png"} alt={data.weather[0].description} className="circle" />
          <span className="title">{data.dt_txt}</span>
          <p>
            <b>Wind:</b>  Gentle Breeze {data.wind.speed} m/s <br />
            <b>Pressure:</b> {data.main.pressure} hpa<br />
            <b>Humidity</b> {data.main.humidity} %<br />
            <b>Max temp</b> {kelvinToCelcius(data.main.temp_max)} °C<br />
            <b>Min temp</b> {kelvinToCelcius(data.main.temp_min)} °C
          </p>
        </li>
      ))}
    </ul>
  )
}

class Weather extends React.Component {

  /*
   * Show details is stored as a state variable so that if the
   * user expand details and then search for a new city the details is still opened
   */
  constructor() {
    super();
    this.state = {
      showDetails: false
    }
  }

  render() {
    let data = this.props.data;

    // If we dont have any data, just return
    if(!data.main) {
      return <div />
    }

    let toggleDetails = (e) => {
      e.nativeEvent.preventDefault()
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    return (
      <div className="container">
        <h4>{data.city.name}, {data.city.country}</h4>
        <div className="row">
          <div className="col s12 m8 offset-m2 l5">
            <div className="card-panel z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s2">
                  <img src={"http://openweathermap.org/img/w/"+data.weather[0].icon+".png"} alt={data.weather[0].description} />
                </div>
                <div className="col s10">
                  <span className="black-text">
                    Right now it's {kelvinToCelcius(data.main.temp)} °C and {data.weather[0].description}.
                    It's been at most {kelvinToCelcius(data.main.temp_max)} °C today.
                  </span>
                </div>
              </div>
            </div>
            <div className="hide-on-med-and-down">
              <ul className="collection z-depth-1">
                <li className="collection-item"><b>Wind:</b>  Gentle Breeze {data.wind.speed} m/s </li>
                <li className="collection-item"><b>Pressure:</b> {data.main.pressure} hpa</li>
                <li className="collection-item"><b>Humidity</b> {data.main.humidity} %</li>
                <li className="collection-item"><b>Max temp</b> {kelvinToCelcius(data.main.temp_max)} °C</li>
                <li className="collection-item"><b>Min temp</b> {kelvinToCelcius(data.main.temp_min)} °C</li>
                <li className="collection-item"><b>Sunrise</b> {onlyTime(new Date(data.sys.sunrise*1000))} °C</li>
                <li className="collection-item"><b>Sunset</b> {onlyTime(new Date(data.sys.sunset*1000))} °C</li>
              </ul>
            </div>
          </div>
          <div className="col s12 m12 l7">
            <div className="card z-depth-1">
              <div className="card-content">
                <h5>Forecast for the upcoming five days</h5>
                <Chart config={generateChartConfig(data)} />
                {this.state.showDetails ? <ForecastDetails details={data.list} /> : null}
                <div className="card-action">
                  <a href="#" onClick={toggleDetails}>
                    {this.state.showDetails ? "Hide detailed forecast" : "Show detailed forecast"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather
