import { ButtonView } from "../../button/models/button-parameters.model";

export interface ISnackBarBtn {
  buttonText: string;
  buttonView: ButtonView;
  action: Function;
}