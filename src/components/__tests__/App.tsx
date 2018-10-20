import * as React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import App from '../App';

describe('App', () => {
  test('should render', () => {
    const wrapper = shallow(
      <Provider dictionaryStore={{ count: 5, increment: jest.fn() }}>
        <App />
      </Provider>
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
