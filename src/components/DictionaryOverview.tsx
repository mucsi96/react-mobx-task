import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
import ViewStore from '../stores/ViewStore';
import Dictionary from '../models/Dictionary';
import { transaction } from 'mobx';

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
        <>
          {this.renderHeader()}
          <div className="ui placeholder segment">
            <div className="ui icon header">No transformations yet.</div>
            {this.renderAddButton()}
          </div>
        </>
      );
    }

    return (
      <>
        {this.renderHeader()}
        <div className="ui basic segment">
          <table className="ui selectable celled table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {this.dictionary.transformations.map(({ id, from, to }) => (
                <tr key={id} onClick={() => this.handleItemClick(id)}>
                  <td>
                    {this.renderValidationIcon(id)}
                    {from}
                  </td>
                  <td>{to}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.renderAddButton()}
        </div>
      </>
    );
  }

  private renderHeader() {
    return (
      <div className="ui basic clearing segment">
        <div className="ui left floated header">{this.dictionary.name}</div>
        <div className="ui right floated header">
          <button className="ui button" onClick={this.handleClickEdit}>
            Edit
          </button>
          <button className="ui red button" onClick={this.handleClickDelete}>
            Delete
          </button>
        </div>
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
        Add transformation
      </button>
    );
  }

  private handleClickAdd = () => {
    this.injected.viewStore.createTransformation(this.props.dictionaryId);
  };

  private handleClickEdit = () => {
    this.injected.viewStore.editDictionary(this.props.dictionaryId);
  };

  private handleClickDelete = () => {
    this.injected.dictionaryStore.removeDectionary(this.props.dictionaryId);
    this.injected.viewStore.showOverview();
  };

  private handleItemClick = (transformationId: string) => {
    this.injected.viewStore.editTransformation(
      this.props.dictionaryId,
      transformationId
    );
  };

  private renderValidationIcon(transformationId: string) {
    const validationMessage = this.dictionary.getValidationErrorById(
      transformationId
    );

    if (validationMessage) {
      return (
        <span className="ui vaidation icon" data-tooltip={validationMessage}>
          <i className="yellow exclamation triangle icon" />
        </span>
      );
    }

    return null;
  }
}
