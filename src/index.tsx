import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './components/App';
import DictionaryStore from './stores/DictionaryStore';
import { startRouting } from './router';
import ViewStore from './stores/ViewStore';

const viewStore = new ViewStore();

startRouting(viewStore);

ReactDOM.render(
  <Provider dictionaryStore={new DictionaryStore()} viewStore={viewStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
