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
      throw new Error(`Dictionary with id ${dictionaryId} was not found.`);
    }

    this.dictionaries.splice(index, 1);
  }

  public getDictionaryById(dictionaryId: string): Dictionary {
    const dictionary = this.dictionaries.find(({ id }) => id === dictionaryId);

    if (!dictionary) {
      throw new Error(`Dictionary with id ${dictionaryId} was not found.`);
    }

    return dictionary;
  }

  public isDictionaryValid(dictionaryId: string): boolean {
    const dictionary = this.getDictionaryById(dictionaryId);

    return dictionary.validationResults.every(
      ({ errorMessage }) => !errorMessage
    );
  }
}
