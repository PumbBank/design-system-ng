import { ViewContainerRef, Injector } from '@angular/core';

export function getInjectorFromSource(source: Injector | ViewContainerRef): Injector | null {
  if (source instanceof Injector) {
    return source;
  }

  if (source instanceof ViewContainerRef) {
    return source.injector;
  }

  return null;
}
