import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.length < 5) { alert("Usernames must be longer than 5 characters.") }
    else if (!email.includes("@") || !email.includes(".")) { alert("Please use a valid email address.") }
    else if (password.length < 1) { alert("Password is required.") }
    else {
      axios.post('https://project-my-flix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          props.onRegister("register");
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering the user: ' + e)
        });
    }

    return (
      <React.Fragment>
        <Form className='form-register'>
          <div className="header">
            <h1 className='text-dark'>Welcome to myFlix!</h1>
            <p className='mb-5'>Please register to continue.</p>
          </div>
          <Form.Group controlId='formBasicText'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@example.com'
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </Form.Group>
          <Form.Group controlId='formBasicBirthday'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder='Enter Birthday'
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={handleRegister}>
            Register
          </Button>
          <Link to={`/`}>
            <Button variant="dark" type="link">
              Back
        </Button>
          </Link>
        </Form>
      </React.Fragment>
    );
  }

  RegisterView.propTypes = {
    register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
    }),
  };
}

export default RegisterView;

