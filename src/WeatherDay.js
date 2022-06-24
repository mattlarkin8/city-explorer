import React from 'react';
import './WeatherDay.css';

class WeatherDay extends React.Component{
  render(){
    return(
        <tr>
          <td>{this.props.datetime}</td>
          <td>{this.props.description}</td>
        </tr>
    )
  }
}

export default WeatherDay;
