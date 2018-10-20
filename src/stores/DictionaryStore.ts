import { observable, action } from 'mobx';

export default class DictionaryStore {
  @observable
  public count: number = 0;

  @action
  public increment(): void {
    this.count = this.count + 1;
  }
}
