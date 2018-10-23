import Transformation from './Transformation';
import { ValidationResult } from './ValidationResult';

export interface Validator {
  validate(transfomations: Transformation[]): ValidationResult;
}
