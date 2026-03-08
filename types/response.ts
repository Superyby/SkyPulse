/**
 * 统一响应格式类型定义
 */

// 统一响应状态码
export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// 统一响应接口
export interface ApiResponse<T = any> {
  code: ResponseCode;
  message: string;
  data: T | null;
  status: 'success' | 'error';
  timestamp: number;
}

// 分页数据接口
export interface PaginatedData<T> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
