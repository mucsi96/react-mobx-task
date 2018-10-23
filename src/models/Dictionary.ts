import Transformation from './Transformation';
import { observable, action } from 'mobx';

export default class Dictionary {
  public readonly id: string;

  @observable
  public name: string;

  @observable
  public transformations: Transformation[] = [];

  constructor(name: string) {
    this.id = Date.now().toString();
    this.name = name;
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
        `Transformation with id "${transformationId}" was not found.`
      );
    }

    this.transformations.splice(index, 1);
  }

  public getTransformationById(transformationId: string): Transformation {
    const transformation = this.transformations.find(
      ({ id }) => id === transformationId
    );

    if (!transformation) {
      throw new Error(
        `Transformation with id ${transformationId} was not found.`
      );
    }

    return transformation;
  }
}
