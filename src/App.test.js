import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';

it('renders without crashing', function() {
  const mockStore = configureStore([ thunk ]);
  const store = mockStore({ pin: 1111 });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

it('matches snapshot', function() {
  const mockStore = configureStore([ thunk ]);
  const store = mockStore({ pin: 1111 });

  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
