import page from 'page';
import ViewStore from './stores/ViewStore';
import { autorun } from 'mobx';

export function startRouting(viewStore: ViewStore) {
  page('/', () => {
    viewStore.showOverview();
  });

  page();

  autorun(() => {
    const path = viewStore.currentPath;
    if (path !== window.location.pathname) {
      window.history.pushState(null, document.title, path);
    }
  });
}
