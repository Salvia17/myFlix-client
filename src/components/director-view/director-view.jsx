import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Container className="director">

        <div className="director-title">
          <h2>{director.Director.Name}</h2>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{director.Director.Birth}</span>
        </div>

        <div className="button-div">
          <Link to={`/`}>
            <Button variant="dark" type="link">Return</Button>
          </Link>
        </div>
        <h4>{director.Director.Name} movies</h4>
        <Container>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
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
                          <Button variant="dark" type="link">
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

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
  }),
};