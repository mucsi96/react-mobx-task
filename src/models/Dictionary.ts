import Transformation from './Transformation';
import { observable, action, autorun } from 'mobx';
import { ValidationResul } from './ValidationResult';
import CloneValidator from './CloneValidator';
import ForkValidator from './ForkValidator';
import { Validator } from './Validator';

export default class Dictionary {
  public readonly id: string;

  @observable
  public name: string;

  @observable
  public transformations: Transformation[] = [];

  @observable
  public validationResults: ValidationResul[] = [];

  constructor(name: string) {
    this.id = Date.now().toString();
    this.name = name;

    autorun(
      () => {
        this.validationResults = [
          new CloneValidator(),
          new ForkValidator()
        ].map(({ validate }: Validator) => validate(this.transformations));
      },
      { delay: 300 }
    );
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

  public getValidationErrorById(transformationId: string): string | undefined {
    for (const vaidationResult of this.validationResults) {
      for (const transformation of vaidationResult.invalidItems) {
        if (transformation.id === transformationId) {
          return vaidationResult.errorMessage;
        }
      }
    }
  }
}
