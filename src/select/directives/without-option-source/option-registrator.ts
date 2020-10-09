import { InjectionToken } from '@angular/core';
import { MillSelectOption } from '../../select-option';

export const OPTION_REGISTRAR_KEY = new InjectionToken<MillOptionRegistrar>('SELECT_OPTION_REGISTRAR_KEY');

export interface MillOptionRegistrar<K = any, P = any> {
  registeredOption(option: MillSelectOption<K, P>): void;
  unregisteredOption(option: MillSelectOption<K, P>): void;
}
