import { ValidationErrors } from '@angular/forms';

const errorMessages: {
  [validatorType: string]: (...args: any) => string;
} = {
  required: () => 'Обов\'язкове поле',
  min: (min: number) => `Мінімальне значення ${min}`,
  max: (max: number) => `Максимальне значення ${max}`,
  email: () => `Введено недійсний формат для Email`,
  minlength: (minlength: number) => `Мінімальна кіл-сть знаків ${minlength}`,
  maxlength: (maxlength: number) => `Максимальна кіл-сть знаків ${maxlength}`,
  pattern: () => `Дані не відповідають шаблону`,
  default: (errors: ValidationErrors) => JSON.stringify(errors)
};

export class ErrorMessageHelper {

  static getMessage(errors: ValidationErrors): string {

    if (errors.required) {
      return errorMessages.required();
    }

    if (errors.min) {
      return errorMessages.min(errors.min.min);
    }

    if (errors.max) {
      return errorMessages.max(errors.max.max);
    }

    if (errors.email) {
      return errorMessages.email();
    }

    if (errors.minlength) {
      errorMessages.minlength(errors.minlength.requiredLength);
    }

    if (errors.maxlength) {
      errorMessages.maxlength(errors.maxlength.requiredLength);
    }

    if (errors.pattern) {
      return errorMessages.pattern();
    }

    if (errors.errorMessage) {
      return errors.errorMessage;
    }

    return errorMessages.default(errors);
  }
}
