import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';

@inject('dictionaryStore')
@observer
export default class DictionaryList extends React.Component {
  get injected() {
    return this.props as { dictionaryStore: DictionaryStore };
  }

  render(): JSX.Element {
    if (!this.injected.dictionaryStore.dictionaries.length) {
      return (
        <div className="ui placeholder segment">
          <div className="ui header">No dictionaries yet.</div>
          <button className="ui primary button">Add dictionary</button>
        </div>
      );
    }

    return (
      <ul>
        {this.injected.dictionaryStore.dictionaries.map(({ id }) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    );
  }
}
