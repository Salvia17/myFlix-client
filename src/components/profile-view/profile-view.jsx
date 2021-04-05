import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favouriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    let url =
      "https://project-my-flix.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: this.formatDate(response.data.Birthday),
          favouriteMovies: response.data.FavouriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://project-my-flix.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites!");
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (confirm("Are you sure you want to delete your account?")) {
      axios.delete(
        `https://project-my-flix.herokuapp.com/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + " has been deleted");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    const { movies } = this.props;
    const { favouriteMovies } = this.state;

    if (!movies) alert("Please sign in");
    return (

      <Container>
        <Row>
          <Col sm={8}>
            <div className="userProfile">
              <Form>
                <h1 className="profile-details">Profile Details</h1>

                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.birthday}</Form.Label>
                </Form.Group>

                <Link to={`/update/${this.state.username}`}>
                  <Button className="profile-button" variant="dark" style={{ width: "10rem" }}>
                    Edit Profile
                  </Button>
                </Link>

                <Link to={`/`}>
                  <Button className="profile-button" variant="dark" style={{ width: "10rem" }}>
                    Back to Main
                  </Button>
                </Link>

                <Button className="profile-button" variant="dark" style={{ width: "10rem" }}
                  onClick={() => this.handleDelete()}>
                  Delete Account
                </Button>
              </Form>
            </div>
          </Col>

          <Col sm={4}>
            <div className="favoriteMovies">
              <h1 className="profile-details" style={{ textAlign: "center" }}>Favorite Movies</h1>

              {favouriteMovies.length === 0 && <div style={{ textAlign: "center" }}>You don't have any favorite movies yet!</div>}

              {favouriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === favouriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <div key={movie._id}>
                        <Card style={{ border: "light" }}>
                          <Card.Img variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Link className="text-muted" to={`/movies/${movie._id}`}>
                              <Card.Title>{movie.Title}</Card.Title>
                            </Link>
                          </Card.Body>
                        </Card>
                        <Button size="sm" variant="dark" className="remove-favorite" onClick={() => this.removeFavorite(movie)}>
                          Remove
                        </Button>
                      </div>
                    );
                  }
                })}
            </div>
          </Col>
        </Row>
      </Container>

    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};