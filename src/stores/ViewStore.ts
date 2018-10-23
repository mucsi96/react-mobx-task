import { observable, autorun, action } from 'mobx';
import {
  View,
  OverviewView,
  CreateDictionaryView,
  EditDictionaryView,
  DictionaryView,
  CreateTransformationView,
  EditTransformationView
} from '../views';
import NotFoundView from '../views/NotFoundView';
import page from 'page';

export default class ViewStore {
  @observable
  public currentView: View = new NotFoundView();

  constructor() {
    page(OverviewView.pattern, () => this.showOverview());
    page(CreateDictionaryView.pattern, () => this.createDictionary());
    page(DictionaryView.pattern, ({ id }) => this.editDictionary(id));
    page(EditDictionaryView.pattern, ({ id }) => this.editDictionary(id));
    page(CreateTransformationView.pattern, ({ dictionaryId }) =>
      this.createTransformation(dictionaryId)
    );
    page(EditTransformationView.pattern, ({ dictionaryId, transformationId }) =>
      this.editTransformation(dictionaryId, transformationId)
    );
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
  public showDictionary(id: string) {
    this.currentView = new DictionaryView(id);
  }

  @action
  public editDictionary(id: string) {
    this.currentView = new EditDictionaryView(id);
  }

  @action
  public showNotFound() {
    this.currentView = new NotFoundView();
  }

  @action
  public createTransformation(dictionaryId: string) {
    this.currentView = new CreateTransformationView(dictionaryId);
  }

  @action
  public editTransformation(dictionaryId: string, transformationId: string) {
    this.currentView = new EditTransformationView(
      dictionaryId,
      transformationId
    );
  }
}
