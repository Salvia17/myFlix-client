import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post("https://project-my-flix.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("no such user");
        alert("Incorrect username or password");
      });
  }

  return (
    <Form className="login-form">
      <div className="login-header">
        <h1 className="text-dark">Welcome to myFlix!</h1>
        <p className="mb-5">Please login or register to continue.</p>
      </div>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text"
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter Username" />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter Password" />
      </Form.Group>

      <Button variant="dark" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      <Link to={`/register`}>
        <Button variant="dark" type="link">
          Register
        </Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

export default LoginView;