import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MemoryRouter } from 'react-router-dom';
import CloseDay from './CloseDay';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

it('renders without crashing', function() {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CloseDay />
      </MemoryRouter>
    </Provider>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <CloseDay />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
