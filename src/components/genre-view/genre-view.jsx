import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="genre">

        <div className="genre-title">
          <h2>{genre.Genre.Name} genre</h2>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Genre.Description}</span>
        </div>

        <div className="button-div">
          <Link to={`/`}>
            <Button variant="dark" type="link">Return</Button>
          </Link>
        </div>
        <h4>{genre.Genre.Name} movies</h4>
        <Container>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Genre.Name) {
                return (
                  <div key={movie._id}>
                    <Card border="light"
                      className="mb-3 mr-2 h-100"
                      style={{ width: "16rem" }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                          {movie.Description.substring(0, 90)}...
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-top-0">
                        <Link to={`/movies/${movie._id}`}>
                          <Button variant="dark" type="link"
                          >
                            Read more
                          </Button>
                        </Link>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container >
    );
  }
}

GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    },
  }),
};