import page from 'page';
import ViewStore from './stores/ViewStore';

export function startRouting(viewStore: ViewStore) {
  page('/', () => {
    viewStore.showOverview();
  });

  page();
}
