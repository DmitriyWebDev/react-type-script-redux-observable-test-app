import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './shared/styles/styles.scss';
import configureStore from './redux/configureStore';
import LoginPage from './pages/LoginPage/LoginPage';
import RootPage from './pages/RootPage/RootPage';
import { request, HTTP_METHODS } from './shared/utils/request/request-utils';
import { ApiError } from './shared/types/common-types';

const store = configureStore();

export class App extends React.Component {
  componentDidMount() {
    (async () => {
      let res: number[] = [];

      await request<number[]>('/url-1', HTTP_METHODS.GET)
        .then(items => {
          res = [...items];
          console.log(res);
        })
        .catch((err: ApiError) => {
          console.log(err.httpStatusCode);
        });
    })();
  }

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
