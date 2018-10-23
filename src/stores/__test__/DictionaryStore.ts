import DictionaryStore from '../DictionaryStore';
import Dictionary from '../../models/Dictionary';

describe('DictionaryStore', () => {
  it('should contain no dictionaries by default', () => {
    const dictionaryStore = new DictionaryStore();
    expect(dictionaryStore.dictionaries).toHaveLength(0);
  });

  it('should be capable to add new dictionaries', () => {
    const dictionaryStore = new DictionaryStore();
    const dictionaryToBeAdded = new Dictionary('test');
    dictionaryStore.addDictionary(dictionaryToBeAdded);
    expect(dictionaryStore.dictionaries).toHaveLength(1);
    expect(dictionaryStore.dictionaries[0]).toBe(dictionaryToBeAdded);
  });

  it('shoud be capable to remove dictionaries', () => {
    const dictionaryStore = new DictionaryStore();
    const dictionaryToBeRemoved = new Dictionary('test');
    const dictionaryToStay = new Dictionary('test');
    dictionaryStore.addDictionary(dictionaryToBeRemoved);
    dictionaryStore.addDictionary(dictionaryToStay);
    dictionaryStore.removeDectionary(dictionaryToBeRemoved.id);
    expect(dictionaryStore.dictionaries).toHaveLength(1);
    expect(dictionaryStore.dictionaries[0]).toBe(dictionaryToStay);
  });
});
