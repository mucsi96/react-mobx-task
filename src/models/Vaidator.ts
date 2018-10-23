import Transformation from './Transformation';
import { ValidationResul } from './ValidationResult';

export interface Validator {
  validate(transfomations: Transformation[]): ValidationResul;
}
