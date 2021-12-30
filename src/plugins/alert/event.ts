import mitt from 'mitt';
import type { EventType } from './declarations';

const emitter = mitt<EventType>();

export default emitter;
