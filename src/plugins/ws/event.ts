import mitt from 'mitt';
import type { Emitter } from 'mitt';
import type { EventType } from './declarations';

const emitter = mitt<any>();

export function useEmitter() {
  return emitter as Emitter<EventType>;
}

export default emitter;
