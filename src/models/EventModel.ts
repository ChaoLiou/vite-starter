export interface EventModel {
  name: string;
  params?: any;
  timestamp: number;
  type: 'request' | 'receive';
}
