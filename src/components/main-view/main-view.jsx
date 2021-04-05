import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";

import "./main-view.scss";
import { Button } from "react-bootstrap";

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
      register: []
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get("https://project-my-flix.herokuapp.com/movies", {
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
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

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, user, register } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        {!user ? (
          <div className="navigation">
            <header>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>MyFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                </Navbar.Collapse>
              </Navbar>
            </header>
          </div>
        ) : (
          <div className="navigation">
            <header>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to={`/`}>
                  <Navbar.Brand>MyFlix</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                  <Nav className="mr-auto">
                    <Link to={`/users/${user}`}>
                      <Button className="nav-button" variant="dark" type="link">Account</Button>
                    </Link>
                    <Button className="nav-button" variant="dark" type="link" onClick={() => this.logOut()}>Log out</Button>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </header>
          </div>
        )}
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <div className="movie-grid">
              {movies.map(m => <MovieCard key={m._id} movie={m} />)}
            </div>
          }
          } />

          <Route path="/register" render={() => {
            if (!user) return <RegisterView onRegister={(register) => this.onRegister(register)} />;
          }} />


          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (
              <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)}
                movies={movies}
              />
            );
          }}
          />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (<DirectorView director={movies.find((m) => m.Director.Name === match.params.name)}
              movies={movies}
            />
            );
          }}
          />

          <Route exact path="/users/:username" render={() =>
            <ProfileView user={localStorage.getItem("user")} movies={movies} />
          } />

          <Route path="/update" render={() => {
            return <ProfileUpdate />;
          }}
          />
        </div>
      </Router>
    );
  }
}
