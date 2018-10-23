import { Validator } from './Vaidator';
import Transformation from './Transformation';
import { ValidationResul } from './ValidationResult';
import {
  transfrormationsToMap,
  TransformationMapInner
} from '../helpers/validationHelper';

export default class ForkValidator implements Validator {
  public validate(transfomations: Transformation[]): ValidationResul {
    const transformationMap = transfrormationsToMap(transfomations);

    const invalidTransfomations: Transformation[] = Object.values(
      transformationMap
    ).reduce(
      (result, innerMap: TransformationMapInner) => {
        if (Object.values(innerMap).length > 1) {
          const transfomationsWithSameFrom = Object.values(innerMap).reduce(
            (result, transfomations: Transformation[]) => [
              ...result,
              ...transfomations
            ],
            [] as Transformation[]
          );

          return [...result, ...transfomationsWithSameFrom];
        }

        return result;
      },
      [] as Transformation[]
    );

    return {
      invalidItems: invalidTransfomations,
      errorMessage: invalidTransfomations.length
        ? 'Rows with same "From" but different "To" are not allowed'
        : undefined
    };
  }
}
