import React from 'react';
import Table from 'react-bootstrap/Table'
import './Weather.css';

class Weather extends React.Component{
  render(){
    return(
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weatherData.map((day,idx)=>(
            <tr key={idx}>
              <td>{day.datetime}</td>
              <td>{day.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  };
};

export default Weather;
