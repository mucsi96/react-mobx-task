import { observable } from 'mobx';

export enum ViewName {
  Overview,
  NotFound
}

export default class View {
  public name: ViewName = ViewName.Overview;
}
