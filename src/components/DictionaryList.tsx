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
          <div className="ui header">No dictionaries yet.</div>
          {this.renderAddButton()}
        </div>
      );
    }

    return (
      <div className="ui segment">
        <h4 className="ui header">{'Dictionaries'}</h4>
        <div className="ui relaxed divided list">
          {this.injected.dictionaryStore.dictionaries.map(({ id, name }) => (
            <div key={id} className="item">
              <div className="content">
                <a className="header" onClick={() => this.handleClickEdit(id)}>
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

  private handleClickEdit = (id: string) => {
    this.injected.viewStore.editDictionary(id);
  };
}
