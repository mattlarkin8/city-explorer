import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityData: {},
      cityMap: ''
    }
  }

  handleInput=(e)=>{
    this.setState({
      city: e.target.value      
    });    
  };

  handleSubmit=async(event)=>{
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LocationIQ_API_Token}&q=${this.state.city}&format=JSON`;
    let cityData = await axios.get(url);
    let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LocationIQ_API_Token}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=18`;
    this.setState({
      cityData: cityData.data[0],
      cityMap: cityMap
    });
  };

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
      <ListGroup as='list-group'>
        <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
        <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
      </ListGroup>
      <Image src={this.state.cityMap}></Image>
      <footer>Author: Matthew Larkin</footer>
    </>
    )
  };
}

export default App;
