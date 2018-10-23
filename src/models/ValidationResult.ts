import Transformation from './Transformation';

export interface ValidationResul {
  errorMessage?: string;
  invalidItems: Transformation[];
}
