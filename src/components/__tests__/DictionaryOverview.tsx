import * as React from 'react';
import * as RTL from 'react-testing-library';
import { Provider } from 'mobx-react';
import DictionaryOverview from '../DictionaryOverview';

const testDictionary = {
  id: '1',
  name: 'a',
  transformations: [
    { id: '1', from: 'b', to: 'c' },
    { id: '2', from: 'd', to: 'e' }
  ],
  getValidationErrorById: (id: string) =>
    id === '1' ? undefined : 'test validation error'
};

const dictionaryStore = {
  removeDectionary: jest.fn(),
  getDictionaryById: (id: string) => (id === '7' ? testDictionary : undefined)
};

const viewStore = {
  createTransformation: jest.fn(),
  editDictionary: jest.fn(),
  showOverview: jest.fn(),
  editTransformation: jest.fn()
};

const render = () =>
  RTL.render(
    <Provider dictionaryStore={dictionaryStore} viewStore={viewStore}>
      <DictionaryOverview dictionaryId="7" />
    </Provider>
  );

describe('DictionaryList', () => {
  it('renders', () => {
    const { asFragment } = render();
    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to create transformation view on "Add transformation" click', () => {
    viewStore.createTransformation.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Add transformation'));
    expect(viewStore.createTransformation).toBeCalledWith('7');
  });

  it('navigates to edit dictionary view on "Edit" click', () => {
    viewStore.editDictionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Edit'));
    expect(viewStore.editDictionary).toBeCalledWith('7');
  });

  it('removes dictionary on "Delete" click', () => {
    dictionaryStore.removeDectionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Delete'));
    expect(dictionaryStore.removeDectionary).toBeCalledWith('7');
  });

  it('navigates to overview on "Delete" click', () => {
    viewStore.showOverview.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Delete'));
    expect(viewStore.showOverview).toBeCalled();
  });

  it('navigates to edit transformation view on item click', () => {
    viewStore.editTransformation.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('d'));
    expect(viewStore.editTransformation).toBeCalledWith('7', '2');
  });

  it('navigates to overview on "Back" click', () => {
    viewStore.showOverview.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Back'));
    expect(viewStore.showOverview).toBeCalled();
  });
});
