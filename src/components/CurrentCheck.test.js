import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MemoryRouter } from 'react-router-dom';
import CurrentCheck from './CurrentCheck';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

it('renders without crashing', function() {
  Element.prototype.scrollIntoView = jest.fn();
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CurrentCheck />
      </MemoryRouter>
    </Provider>
  );
});

it('matches snapshot', function() {
  Element.prototype.scrollIntoView = jest.fn();
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <CurrentCheck />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
