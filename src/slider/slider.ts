/** Slider config interface */
export interface SliderConfigInterface {
  minValue: number;
  maxValue: number;
  lastSelected: ThumbNameEnum;
  hiddenTooltip: ThumbNameEnum;
  selectedThumb: ThumbInterface;
}

/** Slider thumb interface */
export interface ThumbInterface {
  name: string;
  value: number;
  position: number;
}

/** Interface for result output */
export interface ResultInterface {
  minValue?: number;
  maxValue?: number;
}

/** Interface for thumb output */
export interface EventOutputInterface {
  event: Event | MouseEvent | TouchEvent;
  target: ThumbNameEnum;
}

/** Enum for thumb names */
export enum ThumbNameEnum {
  minValue = 'minValue',
  maxValue = 'maxValue',
}

/** Enum for slider type */
export enum SliderTypeEnum {
  basic = 'basic',
  double = 'double',
  step = 'step',
}

/** Enum for keycodes */
export enum KeyCodeEnum {
  keyLeft = 'ArrowLeft',
  keyRight = 'ArrowRight'
}
