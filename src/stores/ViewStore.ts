import { observable, action, computed } from 'mobx';
import View, { ViewName } from '../models/View';

export default class ViewStore {
  @observable
  public currentView: View = {
    name: ViewName.NotFound
  };

  @computed
  public get currentPath(): string {
    switch (this.currentView.name) {
      case ViewName.Overview:
        return '/';
      case ViewName.Dictionary:
        return '/dictionary';
      default:
        return window.location.pathname;
    }
  }

  @action
  public showOverview() {
    this.currentView = {
      name: ViewName.Overview
    };
  }

  @action
  public showDictionary() {
    this.currentView = {
      name: ViewName.Dictionary
    };
  }
}
