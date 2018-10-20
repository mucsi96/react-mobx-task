import Transformation from './Transformation';
import { observable, action } from 'mobx';

export default class Dictionary {
  public readonly id: string;

  @observable
  public transformations: Transformation[] = [];

  constructor() {
    this.id = Date.now().toString();
  }

  @action
  public addTransformation(transformation: Transformation) {
    this.transformations.push(transformation);
  }

  @action
  public removeTransformation(transformationId: string) {
    const index = this.transformations.findIndex(
      ({ id }) => id === transformationId
    );

    if (index < 0) {
      throw new Error(
        `Transformation with index "${transformationId}" was not found.`
      );
    }

    this.transformations.splice(index, 1);
  }
}
