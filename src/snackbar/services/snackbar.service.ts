import { ComponentRef, Injectable, Injector } from '@angular/core';
import { DomService } from '../../utils/services/dom.service';
import { SnackBarOverlayComponent } from '../components/snackbar-overlay/snackbar-overlay.component';
import { SnackBarConfig } from '../models/snackbar-config.model';
import { ISnackbarController } from '../models/snackbar-controller.model';
import { SnackbarRef, SNACK_BAR_CONTROLLER, SNACK_BAR_DATA } from '../shared/snackbar';

@Injectable()
export class SnackBarService {
  private snackBarComponentRef: ComponentRef<any>;
  private controller: ISnackbarController;

  constructor(
    private domService: DomService
  ) { }

  open(message: string, config: SnackBarConfig): void {

    if (!!this.controller) {
      this.controller.close();
    }
    const snackbarRef = new SnackbarRef();
    this.controller = this.createDialogController(snackbarRef);
    const data = {
      data: {
        message: message,
        config: config
      }
    };

    const providers = [
      { provide: SNACK_BAR_CONTROLLER, useValue: this.controller },
      { provide: SNACK_BAR_DATA, useValue: data },
    ];

    const inject = Injector.create({
      providers: providers
    });

    this.snackBarComponentRef = this.domService.createComponent<SnackBarOverlayComponent>(SnackBarOverlayComponent, null, inject);
    this.domService.attachComponent(this.snackBarComponentRef, document.body);
  }

  private createDialogController(snackbarRef: SnackbarRef): ISnackbarController {
    return {
      close: () => {
        this.close();
        snackbarRef.close();
      },
      onClose: snackbarRef.onClose
    }
  }

  close(): void {
    if (this.snackBarComponentRef) {
      this.domService.destroyComponent<any>(this.snackBarComponentRef);
    }
  }
}
