import { observable, action } from 'mobx';
import Dictionary from '../models/Dictionary';

export default class DictionaryStore {
  @observable
  public dictionaries: Dictionary[] = [];

  @action
  public addDictionary(dictionary: Dictionary) {
    this.dictionaries.push(dictionary);
  }

  @action
  public removeDectionary(dictionaryId: string) {
    const index = this.dictionaries.findIndex(({ id }) => id === dictionaryId);

    if (index < 0) {
      throw new Error(`Dictionary with index ${index} was not found.`);
    }

    this.dictionaries.splice(index, 1);
  }
}
