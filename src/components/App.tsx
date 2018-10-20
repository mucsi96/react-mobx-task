import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';

@inject('dictionaryStore')
@observer
export default class App extends React.Component {
  get injected() {
    return this.props as { dictionaryStore: DictionaryStore };
  }

  render(): JSX.Element {
    return <button>{'hello'}</button>;
  }
}
