/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export interface RegularListResponse<T> {
  data: {
    count: number;
    results: T[];
  };
  code: string;
  message: string;
}

export interface ListResponse<T> {
  code: string;
  message: string;
  data: T[];
}

export interface Response<T> {
  code: string;
  message: string;
  data: T;
}

export interface ParamFilter {
  field: string;
  mode: 'contain' | 'in';
  value: string | string[];
}

export interface ParamSort {
  order: 'descend' | 'ascend';
  field: string;
}

export interface ListQueryParamsType {
  pageSize?: number;
  page?: number;
  sort?: ParamSort;
  filters?: ParamFilter[];
  searchInput?: string;
  startDateTime?: Date;
  endDateTime?: Date;
}

export enum ResponseCodeKeys {}
