import React from 'react';
import WeatherDay from './WeatherDay';
import Table from 'react-bootstrap/Table'
import './Weather.css';


class Weather extends React.Component{
  render(){
    let weatherDay=this.props.weatherData.map((day,idx)=>{
      return<WeatherDay
      key={idx}
      datetime={day.time}
      description={day.forecast}
      ></WeatherDay>
    })

    return(
      <>
        <h2>Weather</h2>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {weatherDay}
          </tbody>
        </Table>
      </>
    )
  };
};

export default Weather;
