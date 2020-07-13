import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import App from '../App';

export default function Root({ store, history, ...props }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App {...props} />
      </Router>
    </Provider>
  );
}
