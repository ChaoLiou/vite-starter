import { Socket } from 'socket.io-client';
import type { EventInterface } from '@/interfaces/EventInterface';

export const state = {
  socket: undefined as Socket | undefined,
  connected: false,
  events: [] as EventInterface[],
};

export type State = typeof state;
