import * as React from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
import ViewStore from '../stores/ViewStore';
import Dictionary from '../models/Dictionary';
import Transformation from '../models/Transformation';

interface EditTransformationProps {
  dictionaryId: string;
  transformationId?: string;
}

@inject('dictionaryStore', 'viewStore')
@observer
export default class EditTransformation extends React.Component<
  EditTransformationProps
> {
  get injected() {
    return (this.props as unknown) as {
      dictionaryStore: DictionaryStore;
      viewStore: ViewStore;
    };
  }

  @observable
  private from: string = '';

  @observable
  private to: string = '';

  private readonly dictionary: Dictionary;
  private readonly transformation?: Transformation;

  constructor(props: EditTransformationProps) {
    super(props);
    this.dictionary = this.injected.dictionaryStore.getDictionaryById(
      props.dictionaryId
    );
    if (props.transformationId) {
      this.transformation = this.dictionary.getTransformationById(
        props.transformationId
      );
      this.from = this.transformation.from;
      this.to = this.transformation.to;
    }
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="ui basic clearing segment">
          <div className="ui left floated header">
            {this.transformation
              ? 'Edit transformation'
              : 'Create transformation'}
          </div>
          <div className="ui right floated header">
            {this.props.transformationId ? (
              <button
                className="ui red button"
                onClick={this.handleClickDelete}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
        <div className="ui basic segment">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>From</label>
              <input
                autoFocus={true}
                type="text"
                value={this.from}
                onChange={event => this.setFrom(event.target.value)}
                required={true}
              />
            </div>
            <div className="field">
              <label>To</label>
              <input
                type="text"
                value={this.to}
                onChange={event => this.setTo(event.target.value)}
                required={true}
              />
            </div>
            <button type="submit" className="ui button primary">
              {this.transformation ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              className="ui button"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.transformation) {
      this.dictionary.addTransformation(new Transformation(this.from, this.to));
    } else {
      this.transformation.from = this.from;
      this.transformation.to = this.to;
    }
    this.injected.viewStore.showDictionary(this.props.dictionaryId);
  };

  private handleCancel = () => {
    this.injected.viewStore.showDictionary(this.props.dictionaryId);
  };

  private handleClickDelete = () => {
    if (this.props.transformationId) {
      this.dictionary.removeTransformation(this.props.transformationId);
    }
    this.injected.viewStore.showDictionary(this.props.dictionaryId);
  };

  @action
  private setFrom(from: string) {
    this.from = from;
  }

  @action
  private setTo(to: string) {
    this.to = to;
  }
}
