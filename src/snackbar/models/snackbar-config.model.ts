import { ISnackBarBtn } from "./actions.model";

export enum VerticalPosition{
  top,
  center,
  bottom
}

export enum HorizontalPosition {
  center,
  left,
  right
}

export class SnackBarConfig {
  type: 'alert' | 'notification';
  verticalPosition: VerticalPosition = VerticalPosition.bottom;
  horizontalPosition: HorizontalPosition = HorizontalPosition.center;
  duration: number = 0;
  buttons?: Array<ISnackBarBtn>;
}