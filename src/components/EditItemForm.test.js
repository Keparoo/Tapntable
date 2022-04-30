import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MemoryRouter } from 'react-router-dom';
import EditItemForm from './EditItemForm';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const item = { id: 1, name: 'test' };

it('renders without crashing', function() {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EditItemForm item={item} />
      </MemoryRouter>
    </Provider>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <EditItemForm item={item} />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
