import { observable, autorun, action } from 'mobx';
import { View, Overview, Dictionary } from '../views';
import NotFound from '../views/NotFound';
import page from 'page';

export default class ViewStore {
  @observable
  public currentView: View = new NotFound();

  constructor() {
    page(Overview.pattern, () => this.showOverview());
    page(Dictionary.pattern, () => this.showDictionary());
    page(NotFound.pattern, () => this.showNotFound());
    page();

    autorun(() => {
      if (this.currentView.path !== window.location.pathname) {
        window.history.pushState(null, document.title, this.currentView.path);
      }
    });
  }

  @action
  showOverview() {
    this.currentView = new Overview();
  }

  @action
  showDictionary() {
    this.currentView = new Dictionary();
  }

  @action
  showNotFound() {
    this.currentView = new NotFound();
  }
}
