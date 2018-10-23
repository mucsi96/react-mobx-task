import * as React from 'react';
import * as RTL from 'react-testing-library';
import { Provider } from 'mobx-react';
import EditTransformation from '../EditTransformation';
import Transformation from '../../models/Transformation';

const testTransformation = { id: '1', from: 'b', to: 'c' };

const testDictionary = {
  getTransformationById: (id: string) =>
    id === '11' ? testTransformation : undefined,
  addTransformation: jest.fn(),
  removeTransformation: jest.fn()
};

const dictionaryStore = {
  getDictionaryById: (id: string) => (id === '7' ? testDictionary : undefined)
};

const viewStore = {
  showDictionary: jest.fn()
};

const render = ({ create = false } = {}) =>
  RTL.render(
    <Provider dictionaryStore={dictionaryStore} viewStore={viewStore}>
      <EditTransformation
        dictionaryId="7"
        transformationId={create ? undefined : '11'}
      />
    </Provider>
  );

describe('EditTransformation', () => {
  it('renders', () => {
    const { asFragment } = render();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in creation case', () => {
    const { asFragment } = render({ create: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('modifies transformation on submit in case of editing', () => {
    const { getByLabelText, getByText } = render();
    RTL.fireEvent.change(getByLabelText('From'), {
      target: { value: 'new from' }
    });
    RTL.fireEvent.change(getByLabelText('To'), {
      target: { value: 'new to' }
    });
    RTL.fireEvent.submit(getByText('Save'));
    expect(testTransformation.from).toEqual('new from');
    expect(testTransformation.to).toEqual('new to');
  });

  it('creates new transformation on submit in case of creation', () => {
    testDictionary.addTransformation.mockClear();
    const { getByLabelText, getByText } = render({ create: true });
    RTL.fireEvent.change(getByLabelText('From'), {
      target: { value: 'new from' }
    });
    RTL.fireEvent.change(getByLabelText('To'), {
      target: { value: 'new to' }
    });
    RTL.fireEvent.submit(getByText('Create'));
    expect(testDictionary.addTransformation).toBeCalled();
  });

  it('navigates to dictionary view on "Cancel" click', () => {
    viewStore.showDictionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Cancel'));
    expect(viewStore.showDictionary).toBeCalledWith('7');
  });

  it('removes transformation on "Delete" click', () => {
    testDictionary.removeTransformation.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Delete'));
    expect(testDictionary.removeTransformation).toBeCalledWith('11');
  });

  it('navigates to dictionary view on "Delete" click', () => {
    viewStore.showDictionary.mockClear();
    const { getByText } = render();
    RTL.fireEvent.click(getByText('Delete'));
    expect(viewStore.showDictionary).toBeCalledWith('7');
  });
});
