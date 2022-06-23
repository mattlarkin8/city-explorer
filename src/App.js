import React from 'react';
import axios from 'axios';
import Weather from './Weather'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityData: {},
      cityMap: '',
      error: false,
      errorMessage: '',
      weatherError: false,
      weatherErrorMessage: '',
      searchQuery: '',
      weatherData: [],
      displayWeather: false
    }
  }

  handleInput=(e)=>{
    this.setState({
      city: e.target.value      
    });    
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try{
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LocationIQ_API_Token}&q=${this.state.city}&format=JSON`;
      let cityData = await axios.get(url);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LocationIQ_API_Token}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=11`;
      this.setState({
        cityData: cityData.data[0],
        cityMap: cityMap
      });
      this.handleGetWeather(cityData.data[0].lat,cityData.data[0].lon);
    }
    catch(error){
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}. Please refresh the page and try again.`
      })
    }    
  };

  handleGetWeather=async(lat,lon)=>{
    let url=`${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
    try{
    let weatherData=await axios.get(url);
    this.setState({
      weatherData: weatherData.data,
      displayWeather: true
    });
    }catch(error){
      this.setState({
        weatherError: true,
        weatherErrorMessage: `Error loading weather. ${error.response.status}`
      })
    }
  }

  render(){
    return(
    <>
      <header>
        <h1>City Explorer</h1>
      </header>      
      <Form as='form' onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label as='form-label'>Enter City Name:</Form.Label>
          <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
          <Button type='submit'>Explore!</Button>
        </Form.Group>
      </Form>
      {this.state.error?<Alert variant="danger">{this.state.errorMessage}</Alert>:
        <>
          <Container>
            <ListGroup as='list-group'>
              <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
              <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
              <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
            </ListGroup>
            <Image src={this.state.cityMap}></Image>
          </Container>
        </>
      }
      {this.state.error?<Alert variant="danger">{this.state.errorMessage}</Alert>
      :this.state.displayWeather?
        <Weather
          weatherData={this.state.weatherData}
        ></Weather>
        :''
      }
      <footer>Author: Matthew Larkin</footer>
    </>
    )
  };
}

export default App;
