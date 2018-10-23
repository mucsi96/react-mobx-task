import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
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

  public render(): JSX.Element {
    if (!this.injected.dictionaryStore.dictionaries.length) {
      return (
        <div className="ui placeholder segment">
          <div className="ui icon header">No dictionaries yet.</div>
          {this.renderAddButton()}
        </div>
      );
    }

    return (
      <div className="ui basic segment">
        <div className="ui header">{'Dictionaries'}</div>
        <div className="ui relaxed divided list">
          {this.injected.dictionaryStore.dictionaries.map(({ id, name }) => (
            <div key={id} className="item">
              <div className="content">
                <a className="header" onClick={() => this.handleItemClick(id)}>
                  {name}
                </a>
              </div>
            </div>
          ))}
        </div>
        {this.renderAddButton()}
      </div>
    );
  }

  private renderAddButton() {
    return (
      <button
        autoFocus={true}
        className="ui primary button"
        onClick={this.handleClickAdd}
      >
        Add dictionary
      </button>
    );
  }

  private handleClickAdd = () => {
    this.injected.viewStore.createDictionary();
  };

  private handleItemClick = (id: string) => {
    this.injected.viewStore.showDictionary(id);
  };
}
