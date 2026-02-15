
// This is a simple event emitter to avoid pulling in a large library,
// ensuring the bundle size remains small.
type EventMap = {
    'permission-error': (error: Error) => void;
};

class Emitter {
  private listeners: { [K in keyof EventMap]?: Array<EventMap[K]> } = {};

  on<K extends keyof EventMap>(eventName: K, fn: EventMap[K]) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName]!.push(fn);
  }

  emit<K extends keyof EventMap>(eventName: K, data: Parameters<EventMap[K]>[0]) {
    if (this.listeners[eventName]) {
      this.listeners[eventName]!.forEach(function (fn) {
        fn(data);
      });
    }
  }
}

export const errorEmitter = new Emitter();
