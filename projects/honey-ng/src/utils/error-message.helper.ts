import { ValidationErrors } from '@angular/forms';

const errorMessages: {
  [validatorType: string]: (...args: any) => string;
} = {
  requred: () => 'Поле обязательно для заполнения',
  min: (min: number) => `Минимально допустимое значение ${min}`,
  max: (max: number) => `Максимально допустимое значение ${max}`,
  email: () => `Указан неверный формат для Email`,
  minlength: (minlength: number) => `Минимально допустимое кол-во знаков ${minlength}`,
  maxlength: (maxlength: number) => `Максимально допустимое кол-во знаков ${maxlength}`,
  pattern: () => `Данные не соответствуют шаблону`,
  default: (errors: ValidationErrors) => JSON.stringify(errors)
};

export class ErrorMessageHelper {

  static getMessage(errors: ValidationErrors): string {

    if (errors.requred) {
      return errorMessages.requred(errors.requred.pattern);
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

    return errorMessages.default(errors);
  }
}
