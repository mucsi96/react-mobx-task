import * as React from 'react';
import { inject, observer } from 'mobx-react';
import ViewStore from '../stores/ViewStore';

@inject('viewStore')
@observer
export default class App extends React.Component {
  get injected() {
    return this.props as { viewStore: ViewStore };
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/" className="header item">
              Transformation dictionaries manager
            </a>
          </div>
        </div>
        <div className="ui main text container">
          {this.injected.viewStore.currentView.render()}
        </div>
      </>
    );
  }
}
