import * as React from 'react';
import { inject, observer } from 'mobx-react';
import DictionaryList from './DictionaryList';
import ViewStore from '../stores/ViewStore';
import { View } from '../views';

@inject('viewStore')
@observer
export default class App extends React.Component {
  get injected() {
    return this.props as { viewStore: ViewStore };
  }

  render(): JSX.Element {
    return this.injected.viewStore.currentView.render();
  }
}
