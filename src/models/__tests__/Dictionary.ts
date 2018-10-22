import Dictionary from '../Dictionary';
import Transformation from '../Transformation';

describe('Dictionary', () => {
  it('should have an id', () => {
    const dictionary = new Dictionary('test');
    expect(dictionary.id).toMatch(/^[0-9]{13}$/);
  });

  it('should contain no transfomations by default', () => {
    const dictionary = new Dictionary('test');
    expect(dictionary.transformations).toHaveLength(0);
  });

  it('should be capable to add new transformations', () => {
    const dictionary = new Dictionary('test');
    const transformationToBeAdded = new Transformation('A', 'B');
    dictionary.addTransformation(transformationToBeAdded);
    expect(dictionary.transformations).toHaveLength(1);
    expect(dictionary.transformations[0]).toBe(transformationToBeAdded);
  });

  it('should be capable to remove transfomation', () => {
    const dictionary = new Dictionary('test');
    const transfomationToBeRemoved = new Transformation('A', 'B');
    const transfomationToStay = new Transformation('C', 'D');
    dictionary.addTransformation(transfomationToBeRemoved);
    dictionary.addTransformation(transfomationToStay);
    dictionary.removeTransformation(transfomationToBeRemoved.id);
    expect(dictionary.transformations).toHaveLength(1);
    expect(dictionary.transformations[0]).toBe(transfomationToStay);
  });

  it('should throw error if transfomation to be removed does not exist', () => {
    const dictionary = new Dictionary('test');
    dictionary.addTransformation(new Transformation('A', 'B'));
    dictionary.addTransformation(new Transformation('C', 'D'));
    expect(() => {
      dictionary.removeTransformation('notExistingId');
    }).toThrowError('Transformation with index "notExistingId" was not found.');
  });
});
