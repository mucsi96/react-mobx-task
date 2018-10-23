import { Validator } from './Validator';
import Transformation from './Transformation';
import { ValidationResul } from './ValidationResult';
import {
  transfrormationsToMap,
  TransformationMapInner
} from '../helpers/validationHelper';

export default class CloneValidator implements Validator {
  public validate(transfomations: Transformation[]): ValidationResul {
    const transformationMap = transfrormationsToMap(transfomations);

    const invalidTransfomations: Transformation[] = Object.values(
      transformationMap
    ).reduce(
      (result, innerMap: TransformationMapInner) => {
        const transfomationsWithSameFromAndTo = Object.values(innerMap).reduce(
          (result, transfomations: Transformation[]) => {
            if (transfomations.length > 1) {
              return [...result, ...transfomations];
            }
            return result;
          },
          [] as Transformation[]
        );

        return [...result, ...transfomationsWithSameFromAndTo];
      },
      [] as Transformation[]
    );

    return {
      invalidItems: invalidTransfomations,
      errorMessage: invalidTransfomations.length
        ? 'Identical rows are not allowed'
        : undefined
    };
  }
}
