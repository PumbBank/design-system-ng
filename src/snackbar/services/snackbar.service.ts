import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, InjectionToken, Injector, OnDestroy } from '@angular/core';
import { DomService } from '../../utils/services/dom.service';
import { SnackBarOverlayComponent } from '../components/snackbar-overlay/snackbar-overlay.component';
import { SnackbarWrapperComponent } from '../components/snackbar-wrapper/snackbar-wrapper.component';
import { SnackBarConfig } from '../models/snackbar-config.model';

export const SNACK_BAR_DATA: InjectionToken<any> = new InjectionToken<any>('SNACK_BAR_DATA');

@Injectable()
export class SnackBarService implements OnDestroy {
  private snackBarComponentRef: ComponentRef<any>;
  private componentFactory: ComponentFactory<SnackbarWrapperComponent>;
  

  constructor(
    private domService: DomService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }


  open(message: string, config: SnackBarConfig): void {

    this.close();
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SnackbarWrapperComponent);

    const data = {
      data: {
        message: message,
        config: config
      }
    }

    const providers = [
      { provide: SNACK_BAR_DATA, useValue: data },
    ]

    const inject = Injector.create({
      parent: this.injector,
      providers: providers
    });

    this.snackBarComponentRef = this.domService.createComponent<SnackBarOverlayComponent>(SnackBarOverlayComponent);
    this.domService.attachComponent(this.snackBarComponentRef, document.body);

    const componentRef = this.snackBarComponentRef.instance.viewContainerRef.createComponent(
      this.componentFactory, null, inject
    );
  }

  ngOnDestroy(): void {
    this.close();
  }

  close(): void {
    if (this.snackBarComponentRef) this.domService.destroyComponent<any>(this.snackBarComponentRef);
  }
}
