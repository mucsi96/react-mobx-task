import * as React from 'react';
import * as RTL from 'react-testing-library';
import { Provider } from 'mobx-react';
import EditDictionary from '../EditDictionary';
import Dictionary from '../../models/Dictionary';

const testDictionary = {
  id: '1',
  name: 'a',
  transformations: [
    { id: '1', from: 'b', to: 'c' },
    { id: '2', from: 'd', to: 'e' }
  ]
};

const dictionaryStore = {
  addDictionary: jest.fn(),
  getDictionaryById: (id: string) => (id === '7' ? testDictionary : undefined)
};

const viewStore = {
  showOverview: jest.fn()
};

const render = ({ create = false } = {}) =>
  RTL.render(
    <Provider dictionaryStore={dictionaryStore} viewStore={viewStore}>
      <EditDictionary dictionaryId={create ? undefined : '7'} />
    </Provider>
  );

describe('EditDictionary', () => {
  it('renders', () => {
    const { asFragment } = render();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in creation case', () => {
    const { asFragment } = render({ create: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('creates new dictionary on submit in case of creation', () => {
    dictionaryStore.addDictionary.mockClear();
    const { getByLabelText, getByText } = render({ create: true });
    RTL.fireEvent.change(getByLabelText('Name'), {
      target: { value: 'new dict' }
    });
    RTL.fireEvent.submit(getByText('Create'));
    expect(dictionaryStore.addDictionary).toBeCalled();
  });

  it('modifies dictionary on submit in case of editing', () => {
    const { getByLabelText, getByText } = render();
    RTL.fireEvent.change(getByLabelText('Name'), {
      target: { value: 'new name' }
    });
    RTL.fireEvent.submit(getByText('Save'));
    expect(testDictionary.name).toEqual('new name');
  });
  it('navigates to overview on "Cancel" click', () => {
    viewStore.showOverview.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Cancel'));
    expect(viewStore.showOverview).toBeCalled();
  });
});
