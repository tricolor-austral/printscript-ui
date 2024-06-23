import {Pagination} from "./pagination.ts";

export type PaginatedUsers = Pagination & {
  content: [string]
}
