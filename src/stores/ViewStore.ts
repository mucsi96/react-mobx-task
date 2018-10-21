import { observable, action } from 'mobx';
import View, { ViewName } from '../models/View';

export default class ViewStore {
  @observable
  public currentView: View = {
    name: ViewName.NotFound
  };

  @action
  public showOverview() {
    this.currentView = {
      name: ViewName.Overview
    };
  }
}
