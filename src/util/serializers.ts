import { DateTime } from 'luxon';

// Define the decorator
export function TransformToDateTime() {
  return function (target: any, propertyKey: string | symbol) {
    console.log('target', target);
    let value: string;

    const getter = function () {
      console.log('getter', value);
      return value ? DateTime.fromISO(value) : undefined;
    };

    const setter = function (newVal: string) {
      console.log('setter', newVal);
      value = newVal;
    };

    // Delete the original property
    if (delete target[propertyKey]) {
      // Create new property with getter and setter
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  };
}