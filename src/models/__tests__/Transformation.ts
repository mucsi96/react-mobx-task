import Transformation from '../Transformation';

describe('Transformation', () => {
  it('should have an id', () => {
    const transformation = new Transformation('A', 'B');
    expect(transformation.id).toMatch(/^[0-9]{13}$/);
  });

  it('should initialize the fields using constructor', () => {
    const transformation = new Transformation('A', 'B');
    expect(transformation.from).toEqual('A');
    expect(transformation.to).toEqual('B');
  });
});
