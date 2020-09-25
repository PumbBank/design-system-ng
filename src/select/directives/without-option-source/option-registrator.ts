import { InjectionToken } from '@angular/core';
import { MillSelectOption } from '../../select-option';

export const OPTION_REGISTRATOR_KEY = new InjectionToken<MillOptionRegistrator>('SELECT_OPTION_REGISTRATOR_KEY');

export interface MillOptionRegistrator<K = any, P = any> {
  registrateOption(option: MillSelectOption<K, P>): void;
  unregistrateOption(option: MillSelectOption<K, P>): void;
}
