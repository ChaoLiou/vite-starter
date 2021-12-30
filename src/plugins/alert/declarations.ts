/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export interface MessageType {
  type: 'error' | 'success';
  content: string;
}

export type EventType = {
  show: MessageType;
};
