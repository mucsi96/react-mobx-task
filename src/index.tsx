import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import DictionaryStore from './stores/DictionaryStore';
import ViewStore from './stores/ViewStore';

ReactDOM.render(
  <Provider dictionaryStore={new DictionaryStore()} viewStore={new ViewStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
