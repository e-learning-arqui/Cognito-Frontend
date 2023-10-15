import {Pageable, Sort} from "./pageable";

export interface Paginator<T> {
  content:          T[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  sort:             Sort;
  number:           number;
  first:            boolean;
  size:             number;
  numberOfElements: number;
  empty:            boolean;

}

export interface ApiResponse<T> {
  code: String;
  errorMessage: String;
  response: T;

}
