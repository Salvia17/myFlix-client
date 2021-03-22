import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://project-my-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
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

  // onMovieClick(movie) {
  // this.setState({
  //   selectedMovie: movie
  //  });
  // }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  //onRegister(register) {
  // this.setState({
  //  register
  //  });
  // }

  //returnToList() {
  // this.setState({
  // selectedMovie: null
  // });
  // }


  render() {
    const { movies, user } = this.state;

    //if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className='navigation'>
          <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                  <Nav.Link href="#favourites">Favourite movies</Nav.Link>
                  <Nav.Link href="#account">Account</Nav.Link>
                  <Nav.Link onClick={() => this.logOut()}>Log out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
        </div>
        <div className="main-view">

          <Route exact path="/" render={() =>
            <div className="movie-grid">
              {movies.map(m => <MovieCard key={m._id} movie={m} />)}
            </div>
          } />

          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
        </div>
      </Router>
    );
  }
}