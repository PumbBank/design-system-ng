import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { DIALOG_CONTROLLER, IDialogConroller, IOpenDialogParams } from '../shared/dialog';



@Injectable()
export class DialogService {
  private overlayRef: ComponentRef<OverlayComponent>;

  viewContainerRef: ViewContainerRef;

  activeComponents: ComponentRef<any>[] = [];

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  registrateViewContainer(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  openDialog<T = any>(component: T, params: IOpenDialogParams = {}): IDialogConroller {
    const controller = this.createController();
    const injector = Injector.create([
      { provide: DIALOG_CONTROLLER, useValue: controller }
    ], this.viewContainerRef.injector);

    this.createOverlayIfNotExist(injector);

    this.activeComponents.push(this.createComponent(component, injector));

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

  onBackDropClick(): void {
    this.activeComponents.pop().destroy();

    if (this.activeComponents.length == 0) {
      this.overlayRef.destroy();
      delete this.overlayRef;
    }
  }

  private createController(): IDialogConroller {
    return {
      emitBackdropClick: () => { this.onBackDropClick() }
    }
  }
}
