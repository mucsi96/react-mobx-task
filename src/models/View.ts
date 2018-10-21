import { observable } from 'mobx';

export enum ViewName {
  Overview,
  Dictionary,
  NotFound
}

export default class View {
  public name: ViewName = ViewName.Overview;
}
