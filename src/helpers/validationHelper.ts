import Transformation from '../models/Transformation';

export interface TransformationMapInner {
  [to: string]: Transformation[];
}

export interface TransformationMap {
  [from: string]: TransformationMapInner;
}

export function transfrormationsToMap(
  transfomations: Transformation[]
): TransformationMap {
  return transfomations.reduce(
    (result, transfomation) => {
      if (result[transfomation.from]) {
        if (result[transfomation.from][transfomation.to]) {
          result[transfomation.from][transfomation.to].push(transfomation);
        } else {
          result[transfomation.from][transfomation.to] = [transfomation];
        }
      } else {
        result[transfomation.from] = { [transfomation.to]: [transfomation] };
      }

      return result;
    },
    {} as TransformationMap
  );
}
