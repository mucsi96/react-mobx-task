import * as React from 'react';
import * as RTL from 'react-testing-library';
import { Provider } from 'mobx-react';
import DictionaryList from '../DictionaryList';

const viewStore = {
  createDictionary: jest.fn(),
  showDictionary: jest.fn()
};

const dictionaryStore = {
  dictionaries: [{ id: '1', name: 'a' }, { id: '2', name: 'b' }],
  isDictionaryValid: (id: string) => (id === '1' ? true : false)
};

const emptyDictionaryStore = {
  ...dictionaryStore,
  dictionaries: []
};

const render = ({ empty = false } = {}) =>
  RTL.render(
    <Provider
      dictionaryStore={empty ? emptyDictionaryStore : dictionaryStore}
      viewStore={viewStore}
    >
      <DictionaryList />
    </Provider>
  );

describe('DictionaryList', () => {
  it('renders', () => {
    const { asFragment } = render();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders if there is no dictionary', () => {
    const { asFragment } = render({ empty: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to show dictionary view on item click', () => {
    viewStore.showDictionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('a'));
    expect(viewStore.showDictionary).toBeCalledWith('1');
  });

  it('navigates to create dictionary view on "Add dictionary" press', () => {
    viewStore.createDictionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Add dictionary'));
    expect(viewStore.createDictionary).toBeCalled();
  });
});
