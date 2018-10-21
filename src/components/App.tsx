import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryList from './DictionaryList';
import ViewStore from '../stores/ViewStore';
import { ViewName } from '../models/View';

@inject('viewStore')
@observer
export default class App extends React.Component {
  get injected() {
    return this.props as { viewStore: ViewStore };
  }

  render(): JSX.Element {
    switch (this.injected.viewStore.currentView.name) {
      case ViewName.Overview:
        return <DictionaryList />;
      case ViewName.Dictionary:
        return <span>{'Dictionary'}</span>;
      default:
        return <span>{'Not found'}</span>;
    }
  }
}
