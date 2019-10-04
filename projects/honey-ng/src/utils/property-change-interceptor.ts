export function propertyChangeInterceptor(object: {}, p: string, set?: Function, get?: Function): void {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(object, p);
  const interceptorPropertyDescriptor: PropertyDescriptor = {};

  let getter = propertyDescriptor.get && propertyDescriptor.get.bind(object);
  let setter = propertyDescriptor.set && propertyDescriptor.set.bind(object);

  let propertyValue = object[p];

  if (!getter) {
    getter = () => propertyValue;
  }

  if (!setter) {
    setter = (value: any) => propertyValue = value;
  }

  if (get) {
    interceptorPropertyDescriptor.get = () => {
      get();
      return getter();
    };
  } else {
    interceptorPropertyDescriptor.get = getter;
  }

  if (set) {
    interceptorPropertyDescriptor.set = (value: any) => {
      setter(value);
      set(value);
    };
  } else {
    interceptorPropertyDescriptor.set = setter;
  }


  Object.defineProperty(object, p, interceptorPropertyDescriptor);
}
