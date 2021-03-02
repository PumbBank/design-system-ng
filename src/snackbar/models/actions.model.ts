import { ButtonView } from "../../button";

export interface ISnackBarBtn {
  buttonText: string;
  buttonView: ButtonView;
  action?: Function;
}
