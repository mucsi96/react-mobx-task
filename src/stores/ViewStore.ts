import { observable, autorun, action } from 'mobx';
import {
  View,
  OverviewView,
  CreateDictionaryView,
  EditDictionaryView
} from '../views';
import NotFoundView from '../views/NotFoundView';
import page from 'page';

export default class ViewStore {
  @observable
  public currentView: View = new NotFoundView();

  constructor() {
    page(OverviewView.pattern, () => this.showOverview());
    page(CreateDictionaryView.pattern, () => this.createDictionary());
    page(EditDictionaryView.pattern, ({ id }) => this.editDictionary(id));
    page(NotFoundView.pattern, () => this.showNotFound());
    page();

    autorun(() => {
      if (this.currentView.path !== window.location.pathname) {
        window.history.pushState(null, document.title, this.currentView.path);
      }
    });
  }

  @action
  public showOverview() {
    this.currentView = new OverviewView();
  }

  @action
  public createDictionary() {
    this.currentView = new CreateDictionaryView();
  }

  @action
  public editDictionary(id: string) {
    this.currentView = new EditDictionaryView(id);
  }

  @action
  public showNotFound() {
    this.currentView = new NotFoundView();
  }
}
