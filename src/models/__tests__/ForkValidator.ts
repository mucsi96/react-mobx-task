import { ValidationResult } from '../ValidationResult';
import ForkValidator from '../ForkValidator';
import Transformation from '../Transformation';

const { validate } = new ForkValidator();

describe('ForkValidator', () => {
  it('should give no validation error on valid input', () => {
    const result: ValidationResult = validate([
      new Transformation('a', 'b'),
      new Transformation('c', 'd'),
      new Transformation('e', 'f')
    ]);
    expect(result.errorMessage).toBeUndefined();
    expect(result.invalidItems).toHaveLength(0);
  });

  it('should give no validation error on single input', () => {
    const result: ValidationResult = validate([new Transformation('a', 'b')]);
    expect(result.errorMessage).toBeUndefined();
    expect(result.invalidItems).toHaveLength(0);
  });

  it('should give no validation error on 2 identival rows', () => {
    const transfomation1 = new Transformation('c', 'd');
    const transfomation2 = new Transformation('c', 'd');
    const result: ValidationResult = validate([
      transfomation1,
      new Transformation('e', 'f'),
      transfomation2
    ]);
    expect(result.errorMessage).toBeUndefined();
    expect(result.invalidItems).toHaveLength(0);
  });

  it('should give validation error on 2 fork rows', () => {
    const transfomation1 = new Transformation('c', 'd');
    const transfomation2 = new Transformation('c', 'f');
    const result: ValidationResult = validate([
      transfomation1,
      new Transformation('a', 'b'),
      transfomation2,
      new Transformation('e', 'f')
    ]);
    expect(result.errorMessage).toEqual(
      'Rows with same "From" but different "To" are not allowed'
    );
    expect(result.invalidItems).toHaveLength(2);
    expect(result.invalidItems[0]).toBe(transfomation1);
    expect(result.invalidItems[1]).toBe(transfomation2);
  });

  it('should give validation error on 4 fork rows', () => {
    const transfomation1 = new Transformation('c', 'd');
    const transfomation2 = new Transformation('c', 'd');
    const transfomation3 = new Transformation('c', 'f');
    const transfomation4 = new Transformation('c', 'h');
    const result: ValidationResult = validate([
      transfomation2,
      new Transformation('a', 'b'),
      transfomation1,
      new Transformation('e', 'f'),
      transfomation3,
      new Transformation('g', 'h'),
      transfomation4
    ]);
    expect(result.errorMessage).toEqual(
      'Rows with same "From" but different "To" are not allowed'
    );
    expect(result.invalidItems).toHaveLength(4);
    expect(result.invalidItems[0]).toBe(transfomation2);
    expect(result.invalidItems[1]).toBe(transfomation1);
    expect(result.invalidItems[2]).toBe(transfomation3);
    expect(result.invalidItems[3]).toBe(transfomation4);
  });
});
