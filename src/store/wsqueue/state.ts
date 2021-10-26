import { EventInterface } from '@/interfaces/EventInterface';

export const state = {
  events: [] as EventInterface[],
};

export type State = typeof state;
