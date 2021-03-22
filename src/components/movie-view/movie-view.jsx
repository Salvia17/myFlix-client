import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Card border="light" style={{ width: '25rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </Card.Text>
            <Link to={'/'}>
              <Button className="back-button" variant="dark">Movie list</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired
};