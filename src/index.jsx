import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Container from 'react-bootstrap/Container';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <MainView />
        </Provider>
      </Container>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);