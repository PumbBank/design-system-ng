import { Component } from '@angular/core';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { DIALOG_CONTROLLER, DialogConroller, OpenDialogParams } from '../shared/dialog';

interface ActiveDialog {
  componentRef?: ComponentRef<any>;
}


@Injectable()
export class DialogService {
  private overlayRef: ComponentRef<OverlayComponent>;

  viewContainerRef: ViewContainerRef;

  activeDialogs: ActiveDialog[] = [];

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  registrateViewContainer(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  openDialog<T = any>(component: T, params: OpenDialogParams = {}): DialogConroller {
    const dialog: ActiveDialog = {};
    this.activeDialogs.push(dialog);

    const controller = this.createController(dialog);
    const providers = [
      { provide: DIALOG_CONTROLLER, useValue: controller }
    ];

    const injector = Injector.create(providers, this.getInjectorBySource(params.injectorSource) || this.viewContainerRef.injector);

    this.createOverlayIfNotExist(injector);

    dialog.componentRef = this.createComponent(component, injector);

    return controller;
  }

  private createComponent<T = any>(component: any, injector: Injector): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory<T>(component);
    return this.viewContainerRef.createComponent<T>(factory, null, injector);
  }

  createOverlayIfNotExist(injector: Injector): void {
    if (this.overlayRef) { return; }
    this.overlayRef = this.createComponent(OverlayComponent, injector);
  }

  removeOverlayIfNeed(): void {
    if (this.activeDialogs.length == 0) {
      this.overlayRef.destroy();
      delete this.overlayRef;
    }
  }

  onBackDropClick(): void {
    this.activeDialogs.pop().componentRef.destroy();
    this.removeOverlayIfNeed();
  }

  private createController(dialog: ActiveDialog): DialogConroller {
    return {
      emitBackdropClick: () => { this.onBackDropClick() },
      close: () => {
        const index = this.activeDialogs.indexOf(dialog);
        this.activeDialogs.splice(index, 1);
        dialog.componentRef.destroy();
        this.removeOverlayIfNeed();
      }
    }
  }

  private getInjectorBySource(source: ViewContainerRef | Injector): Injector | null {
    if (source instanceof Injector) {
      return source;
    }

    if (source instanceof ViewContainerRef) {
      return source.injector;
    }

    return null;
  }
}
