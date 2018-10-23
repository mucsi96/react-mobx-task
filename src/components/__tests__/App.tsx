import * as React from 'react';
import * as RTL from 'react-testing-library';
import App from '../App';
import { Provider } from 'mobx-react';

const viewStore = { currentView: { render: () => 'CURRENT VIEW' } };

const render = () =>
  RTL.render(
    <Provider viewStore={viewStore}>
      <App />
    </Provider>
  );

describe('App', () => {
  it('renders', () => {
    const { asFragment } = render();
    expect(asFragment()).toMatchSnapshot();
  });
});
