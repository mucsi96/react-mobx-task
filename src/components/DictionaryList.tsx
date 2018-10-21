import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
import { ViewName } from '../models/View';
import ViewStore from '../stores/ViewStore';

@inject('dictionaryStore', 'viewStore')
@observer
export default class DictionaryList extends React.Component {
  get injected() {
    return this.props as {
      dictionaryStore: DictionaryStore;
      viewStore: ViewStore;
    };
  }

  render(): JSX.Element {
    if (!this.injected.dictionaryStore.dictionaries.length) {
      return (
        <div className="ui placeholder segment">
          <div className="ui header">No dictionaries yet.</div>
          <button
            className="ui primary button"
            onClick={() => this.injected.viewStore.showDictionary()}
          >
            Add dictionary
          </button>
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
