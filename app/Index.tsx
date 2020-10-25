import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './shared/styles/styles.scss';
import configureStore from './redux/configureStore';
import LoginPage from './pages/LoginPage/LoginPage';
import RootPage from './pages/RootPage/RootPage';

const store = configureStore();

export class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" name="LoginPage" component={LoginPage} />
        <Route path={'/'} name="RootPage" component={RootPage} />
      </Switch>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('appRoot'),
);
