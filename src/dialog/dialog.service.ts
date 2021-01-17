import {
  ApplicationRef,
  ComponentFactoryResolver, ComponentRef, EmbeddedViewRef,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MillDialogRef } from './dialog-ref';
import { PortalOverlayComponent } from './components/portal-overlay/portal-overlay.component';

type ComponentOrTemplateRef<T> = ComponentType<T>; // | TemplateRef<T>

export const MILL_DIALOG_DATA: InjectionToken<any> = new InjectionToken<any>('MILL_DIALOG_DATA');

export type ComponentType<T> = new (...args: any[]) => T;

export class MillDialogConfig<D> {
  data?: D | null = null;
  viewContainerRef?: ViewContainerRef;
  id?: string;
  hasBackdrop?: boolean = true;
  backdropClass?: string = '';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string;
  buttons?: {
    apply: { text: string; action: any; };
    cancel: { text: string; action: any; };
  };
  // role?: DialogRole = 'dialog';
  // panelClass?: string | string[] = '';
  // position?: DialogPosition;
  // direction?: Direction;
  // ariaDescribedBy?: string | null = null;
  // ariaLabelledBy?: string | null = null;
  // ariaLabel?: string | null = null;
  // autoFocus?: boolean = true;
  // restoreFocus?: boolean = true;
  // closeOnNavigation?: boolean = true;
  // componentFactoryResolver?: ComponentFactoryResolver;
}

// builder
@Injectable()
export class MillDialog implements OnDestroy {
  // private _overlay;
  // private _injector;
  // private _location;
  // private _defaultOptions;
  // private _parentDialog;
  // private _overlayContainer;
  // private _openDialogsAtThisLevel;
  // private readonly _afterAllClosedAtThisLevel;
  // private readonly _afterOpenedAtThisLevel;
  // private _ariaHiddenElements;
  // private _scrollStrategy;

  readonly openDialogs: MillDialogRef<any>[] = [];

  readonly afterOpened: Subject<MillDialogRef<any>> = new Subject<MillDialogRef<any>>();
  readonly afterOpen: Subject<MillDialogRef<any>> = new Subject<MillDialogRef<any>>();
  readonly _afterAllClosed: Subject<void> = new Subject<void>();
  readonly afterAllClosed: Observable<void>;

  // constructor(_overlay: Overlay, _injector: Injector, _location: Location, _defaultOptions: MatDialogConfig,
  // scrollStrategy: any, _parentDialog: MatDialog, _overlayContainer: OverlayContainer);
  private portalComponent: ComponentRef<PortalOverlayComponent>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private _injector: Injector
  ) {
  }


  resolvePortalOverlay(): ComponentRef<PortalOverlayComponent> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(PortalOverlayComponent);
    const componentRef = componentFactory.create(this._injector);

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.portalComponent = componentRef;
    return this.portalComponent;
  }

  open<T, D = any, R = any>(componentOrTemplateRef: ComponentOrTemplateRef<T>,
                            config?: MillDialogConfig<D>): ComponentRef<T> {
    config = config || new MillDialogConfig<D>();

    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrTemplateRef);

    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [
        {provide: MillDialogConfig, useValue: config},
        {provide: MILL_DIALOG_DATA, useValue: config.data},
      ]
    });

    let viewContainer = config && config.viewContainerRef && config.viewContainerRef;

    if (!viewContainer) {
      const portalOverlay: ComponentRef<PortalOverlayComponent> = this.resolvePortalOverlay(); // hasBackdrop = false (without gray bg), backdropClass (pass config), disableClose

      viewContainer = portalOverlay.instance.viewContainerRef;
    }

    const componentRef = viewContainer.createComponent(componentFactory, null, injector);

    // dialogRef ???
    //   .updateSize(config.width, config.height)
    //   .updatePosition(config.position);

    // this.openDialogs.push(componentRef);
    this.afterOpened.next(componentRef);
    return componentRef;
  }

  public close(): void {
    this.portalComponent.destroy();
    this._afterAllClosed.next();
  }

  closeAll(): void {

  }

  // getDialogById(id: string): MillDialogRef<any> | undefined;

  ngOnDestroy(): void {

  }
}
