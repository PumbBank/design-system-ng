import { DIALOG_SERVICE_CONTROLLER, DialogServiceController, DIALOG_DATA } from './../shared/dialog';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { DIALOG_CONTROLLER, DialogConroller, OpenDialogParams, DialogRef } from '../shared/dialog';
import { getInjectorFromSource } from '../utils/injector-from-source';


@Injectable()
export class DialogService {
  private overlayRef: ComponentRef<OverlayComponent>;
  private serviceController: DialogServiceController = {
    emitBackdropClick: () => { this.onBackDropClick(); }
  };

  viewContainerRef: ViewContainerRef;
  injector: Injector;

  opended: DialogRef[] = [];

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  registrateDefaultViewContainer(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
    this.injector = viewContainerRef.injector;
  }

  openDialog<T = any>(component: T, params: OpenDialogParams = {}): DialogConroller {
    this.createOverlayIfNotExist();

    const dialogRef = new DialogRef(params);
    const controller = this.createDialogController(dialogRef);

    const providers = [
      { provide: DIALOG_CONTROLLER, useValue: controller },
      { provide: DIALOG_DATA, useValue: params.data }
    ];
    const injector = Injector.create(providers, getInjectorFromSource(params.injectorSource) || this.injector);

    dialogRef.componentRef = this.createComponent(component, injector);

    this.opended.push(dialogRef);

    return controller;
  }

  private createComponent<T = any>(component: any, injector: Injector): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory<T>(component);
    return this.viewContainerRef.createComponent<T>(factory, null, injector);
  }

  private closeDialog(dialogRef: DialogRef, ...args: any[]) {
    this.opended.splice(this.opended.indexOf(dialogRef), 1);

    dialogRef.close(args.length === 1 ? args[0] : args);

    this.removeOverlayIfNeed();
  }

  private createDialogController(dialogRef: DialogRef): DialogConroller {
    return {
      close: (...args: any[]) => { this.closeDialog(dialogRef, ...args) },
      onClose: dialogRef.onClose
    }
  }

  private onBackDropClick(): void {
    const dialog = this.opended.pop();
    dialog.close();
    this.removeOverlayIfNeed();
  }

  private removeOverlayIfNeed(): void {
    if (this.opended.length == 0) {
      this.overlayRef.destroy();
      delete this.overlayRef;
    }
  }

  private createOverlayIfNotExist(): void {
    if (this.overlayRef) { return; }

    const providers = [{
      provide: DIALOG_SERVICE_CONTROLLER,
      useValue: this.serviceController
    }];

    const injector = Injector.create(providers, this.injector);

    this.overlayRef = this.createComponent(OverlayComponent, injector);
  }

}
