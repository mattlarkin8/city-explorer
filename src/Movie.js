import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Movie.css'

class Movie extends React.Component{
  render(){
    return(
      <ListGroup>
        <ListGroup.Item>
          Title: {this.props.title}
        </ListGroup.Item>
        <ListGroup.Item>
          Release Date: {this.props.releaseDate}
        </ListGroup.Item>
      </ListGroup>
    )
  }
}

export default Movie;
