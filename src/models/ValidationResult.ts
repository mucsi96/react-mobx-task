import Transformation from './Transformation';

export interface ValidationResult {
  errorMessage?: string;
  invalidItems: Transformation[];
}
