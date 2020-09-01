/**
 *
 * @description Class/Type of option parameter for mill-select
 *
 * @param key This param will be in select.selected and control.value
 * @param K type of key
 *
 * @param value This param will be displayed in default header
 *
 * @param payload Additional data for option if you need
 * @param P Type of payload
 *
 */
export class MillSelectOption<K = any, P = any> {
  constructor(
    public key: K,
    public value: string,
    public payload?: P
  ) { }
}
