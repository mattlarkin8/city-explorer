import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityData: {}
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
    let cityInfo = await axios.get(url);
    this.setState({
      cityData: cityInfo.data[0]
    });
  };

  render(){
    return(
    <>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId=''>
          <Form.Label>Enter City Name:</Form.Label>
          <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
        </Form.Group>
        <Button type='submit'>Explore!</Button>
      </Form>
      <ListGroup>
        <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
        <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
      </ListGroup>
    </>
    )
  };
}

export default App;
