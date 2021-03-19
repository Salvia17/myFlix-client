import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://project-my-flix.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  returnToList() {
    this.setState({
      selectedMovie: null
    });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        <div className='navigation'>
          <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                  <Nav.Link href="#favourites">Favourite movies</Nav.Link>
                  <Nav.Link href="#account">Account</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
        </div>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onClick={() => this.returnToList()} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
              </Col>
            ))
          }
        </Row>
      </React.Fragment >
    );
  }
}