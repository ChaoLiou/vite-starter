import * as faker from 'faker';
import { Response as MiragejsResponse } from 'miragejs';
import { orderBy, reverse } from 'lodash';
import DbCollection from 'miragejs/db-collection';
import type { RegularListResponse, Response, ParamFilter, ParamSort } from '@/models/UtilityModel';

/**
 * e.g. source: ['a', 'b', 'c']
 * without proportion, The probability of each item in {source} is equal;
 * with proportion, e.g. 3:3:2, it'll generate a new source
 * ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c'] to do randomly picking
 * @param source
 * @param proportion The format of x:y:z...:n, its length is same as {source}
 * @returns
 */
export const randomPick = (source: any[], proportion?: string) => {
  let candidates = [...source];
  if (proportion) {
    const proportions = proportion.split(':').map((x) => parseInt(x, 10));
    if (proportions.length === source.length) {
      candidates = candidates
        .map((candidate, index) => Array.from({ length: proportions[index] }, () => candidate))
        .flat();
    }
  }
  const index = faker.datatype.number() % candidates.length;
  return candidates[index];
};

// max - min (+ 1)= range, [min + 0, min + 1, ..., min + range - 1],
export function randomAmountOfResult<T>(
  // eslint-disable-next-line no-unused-vars
  fn: (index: number) => T,
  min: number,
  max: number,
  distinct = false,
) {
  const amountCandidates = Array.from({ length: max - min }, (_, index) => min + index);
  const randomAmount = randomPick(amountCandidates);
  let result = Array.from({ length: randomAmount }, (_, index) => fn(index));
  if (distinct) {
    result = [...new Set<T>(result)];
  }
  return result;
}

export function generateResponse<T>(results: T[], totals: number): RegularListResponse<T> {
  return {
    data: {
      results,
      count: totals,
    },
    code: '',
    message: '',
  };
}

export function generateDetailResponse<T>(results: T): Response<T> {
  return {
    data: results,
    code: '',
    message: '',
  };
}

export function generate4Multiples(length: number) {
  return Array.from({ length }, (_, index) => 4 * (index + 1));
}

export function generateMiragejsResponse(type: 'success' | 'failed') {
  let body;
  let code = 200;
  if (type === 'success') {
    code = 200;
    body = {
      code,
      message: 'Success',
      data: null,
    };
  } else if (type === 'failed') {
    code = 500;
    body = {
      code,
      message: 'Failed',
      data: null,
    };
  }
  return new MiragejsResponse(code, {}, body);
}

export function randomPickMiragejsResponse() {
  const successResponse = generateMiragejsResponse('success');
  const failedResponse = generateMiragejsResponse('failed');
  return randomPick([successResponse, failedResponse], '1:1');
}

type CollectionType = any[] & Omit<DbCollection, 'all'>;

export function doFilter(source: CollectionType, paramFilters: ParamFilter[]) {
  const results = [...source]; // copy from {source}, do not mess up {source}

  const doSingleFilter = (item: any, paramFilter: ParamFilter) => {
    const fieldValue = item[paramFilter.field];
    const isContainMode = paramFilter.mode === 'contain';
    const isInMode = paramFilter.mode === 'in';

    if (isContainMode) {
      return !paramFilter.value || fieldValue.includes(paramFilter.value);
    }

    if (isInMode) {
      return paramFilter.value.length === 0 || paramFilter.value.includes(fieldValue);
    }

    return false;
  };

  return paramFilters.reduce(
    (filteredResults, paramFilter) =>
      filteredResults.filter((item) => doSingleFilter(item, paramFilter)),
    results,
  );
}

export function doSearchAllFields(source: CollectionType, keyword: string) {
  const checkItemMatch = (item: any): boolean => {
    const fieldNames = Object.keys(item);
    // eslint-disable-next-line no-use-before-define
    return fieldNames.some((fieldName) => checkFieldMatch(item, fieldName));
  };

  const checkFieldMatch = (item: any, fieldName: string): boolean => {
    const fieldValue = item[fieldName];
    let matched = false;
    if (typeof fieldValue === typeof '') {
      matched = fieldValue.includes(keyword);
    } else if (Array.isArray(fieldValue)) {
      matched = fieldValue.some(checkItemMatch);
    } else if (typeof fieldValue === typeof {}) {
      matched = checkItemMatch(fieldValue);
    }
    return matched;
  };

  return source.filter(checkItemMatch);
}

export function doPaginate(source: CollectionType, page: number, pageSize: number) {
  return source.slice((page - 1) * pageSize, page * pageSize);
}

export function doSorting(source: CollectionType, sort: ParamSort) {
  let results = [];
  results = orderBy(source, [sort.field]);
  if (sort.order === 'descend') {
    results = reverse(results);
  }
  return results;
}

export function doFilterAmongDateRange(source: CollectionType, startTime: Date, endTime: Date) {
  return source.filter((item) => item.date >= startTime && item.date <= endTime);
}
