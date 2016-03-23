# React Weather

React application that fetches weather data from http://openweathermap.org 
and displays current weather and a forecast for the upcoming five days.

Just type the city that you want the weather for and enjoy (at least if weather is any good).

## Setup

Start by downloading the application and install it's dependencies.
```
git clone https://github.com/snichme/react-weather.git
cd react-weather
npm install
```
When that is done, get an APP_ID for the weather service here: http://openweathermap.org/appid

Enter the APP_ID in the app, on line 12 in index.js you will find 
`const APP_ID = "<ENTER_YOUR_APPID_HERE>"` put your own APP_ID there.

When finished, run:
```
npm start
```
To build the app and start a development server, visit the application at http://localhost:3000
