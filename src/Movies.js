import React from 'react';
import Container from 'react-bootstrap/Container';
import Movie from './Movie'
import './Movies.css';

class Movies extends React.Component{
  render(){
      let movies=this.props.movies.map((movie,idx)=>{
      return<Movie  
      key={idx} 
      title={movie.title}
      releaseDate={movie.releaseDate}
      ></Movie>
    })

    return(
      <>
        <h2>Movies</h2>
        <Container>
          {movies}
        </Container>
      </>
    )
  };
};

export default Movies;
