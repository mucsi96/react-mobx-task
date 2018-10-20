import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import DictionaryStore from './stores/DictionaryStore';

ReactDOM.render(
  <Provider dictionaryStore={new DictionaryStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
