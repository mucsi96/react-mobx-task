import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryStore from '../stores/DictionaryStore';
import ViewStore from '../stores/ViewStore';
import { observable, action } from 'mobx';
import Dictionary from '../models/Dictionary';

interface EditDictionaryProps {
  dictionaryId?: string;
}

@inject('dictionaryStore', 'viewStore')
@observer
export default class EditDictionary extends React.Component<
  EditDictionaryProps
> {
  get injected() {
    return (this.props as unknown) as {
      dictionaryStore: DictionaryStore;
      viewStore: ViewStore;
    };
  }

  @observable
  private name: string = '';

  private readonly dictionary?: Dictionary;

  constructor(props: EditDictionaryProps) {
    super(props);
    if (props.dictionaryId) {
      this.dictionary = this.injected.dictionaryStore.getDictionaryById(
        props.dictionaryId
      );
      this.name = this.dictionary.name;
    }
  }

  public render(): JSX.Element {
    return (
      <div className="ui basic segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="ui header">
            {this.dictionary ? 'Edit dictionary' : 'Create dictionary'}
          </div>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              autoFocus={true}
              type="text"
              value={this.name}
              onChange={event => this.setName(event.target.value)}
            />
          </div>
          <button type="submit" className="ui button primary">
            {this.dictionary ? 'Save' : 'Create'}
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
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.dictionary) {
      this.injected.dictionaryStore.addDictionary(new Dictionary(this.name));
    } else {
      this.dictionary.name = this.name;
    }
    this.injected.viewStore.showOverview();
  };

  private handleCancel = () => {
    this.injected.viewStore.showOverview();
  };

  @action
  private setName(name: string) {
    this.name = name;
  }
}
