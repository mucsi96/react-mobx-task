import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
import ViewStore from '../stores/ViewStore';
import Dictionary from '../models/Dictionary';

interface DictionaryProps {
  dictionaryId: string;
}

@inject('dictionaryStore', 'viewStore')
@observer
export default class DictionaryOverview extends React.Component<
  DictionaryProps
> {
  get injected() {
    return (this.props as unknown) as {
      dictionaryStore: DictionaryStore;
      viewStore: ViewStore;
    };
  }

  private readonly dictionary: Dictionary;

  constructor(props: DictionaryProps) {
    super(props);
    this.dictionary = this.injected.dictionaryStore.getDictionaryById(
      props.dictionaryId
    );
  }

  public render(): JSX.Element {
    if (!this.dictionary.transformations.length) {
      return (
        <div className="ui placeholder segment">
          {this.renderHeader()}
          <div className="ui header">No transformations yet.</div>
          {this.renderAddButton()}
        </div>
      );
    }

    return (
      <div className="ui segment">
        {this.renderHeader()}
        <table className="ui celled table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {this.dictionary.transformations.map(({ id, from, to }) => (
              <tr key={id}>
                <td>{from}</td>
                <td>{to}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.renderAddButton()}
      </div>
    );
  }

  private renderHeader() {
    return (
      <h4 className="ui header">
        {this.dictionary.name}
        <button
          className="ui right floated red button"
          onClick={this.handleClickDelete}
        >
          Delete
        </button>
        <button
          className="ui right floated button"
          onClick={this.handleClickEdit}
        >
          Edit
        </button>
      </h4>
    );
  }

  private renderAddButton() {
    return (
      <button
        autoFocus={true}
        className="ui primary button"
        onClick={this.handleClickAdd}
      >
        Add transformation
      </button>
    );
  }

  private handleClickAdd = () => {};

  private handleClickEdit = () => {
    this.injected.viewStore.editDictionary(this.props.dictionaryId);
  };

  private handleClickDelete = () => {
    this.injected.dictionaryStore.removeDectionary(this.props.dictionaryId);
    this.injected.viewStore.showOverview();
  };
}
