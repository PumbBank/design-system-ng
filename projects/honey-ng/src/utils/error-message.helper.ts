import { ValidationErrors } from '@angular/forms';

const errorMessages: {
  [validatorType: string]: (...args: any) => string;
} = {
  required: () => 'Обязательно для заполнения',
  min: (min: number) => `Минимально значение ${min}`,
  max: (max: number) => `Максимально значение ${max}`,
  email: () => `Указан неверный формат для Email`,
  minlength: (minlength: number) => `Минимально кол-во знаков ${minlength}`,
  maxlength: (maxlength: number) => `Максимально кол-во знаков ${maxlength}`,
  pattern: () => `Данные не соответствуют шаблону`,
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
      return errors.errorMessage
    }

    return errorMessages.default(errors);
  }
}
