/**
 * 统一响应工具类
 * 用于规范化 API 返回格式
 */

import { NextResponse } from 'next/server';
import { ApiResponse, ResponseCode, PaginatedData } from '@/types/response';

export class ResponseUtil {
  /**
   * 成功响应
   */
  static success<T>(data: T, message = '操作成功'): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      message,
      data,
      status: 'success',
      timestamp: Date.now(),
    });
  }

  /**
   * 创建成功响应 (201)
   */
  static created<T>(data: T, message = '创建成功'): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      code: ResponseCode.CREATED,
      message,
      data,
      status: 'success',
      timestamp: Date.now(),
    }, { status: 201 });
  }

  /**
   * 无内容响应 (204) - 用于删除操作
   */
  static noContent(message = '删除成功'): NextResponse<ApiResponse<null>> {
    return NextResponse.json({
      code: ResponseCode.NO_CONTENT,
      message,
      data: null,
      status: 'success',
      timestamp: Date.now(),
    }, { status: 204 });
  }

  /**
   * 分页数据响应
   */
  static paginated<T>(
    list: T[],
    page: number,
    pageSize: number,
    total: number,
    message = '获取成功'
  ): NextResponse<ApiResponse<PaginatedData<T>>> {
    return NextResponse.json({
      code: ResponseCode.SUCCESS,
      message,
      data: {
        list,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      status: 'success',
      timestamp: Date.now(),
    });
  }

  /**
   * 错误响应
   */
  static error(
    message = '操作失败',
    code: ResponseCode = ResponseCode.INTERNAL_ERROR
  ): NextResponse<ApiResponse<null>> {
    return NextResponse.json({
      code,
      message,
      data: null,
      status: 'error',
      timestamp: Date.now(),
    }, { status: code >= 400 && code < 500 ? code : 500 });
  }

  /**
   * 参数错误 (400)
   */
  static badRequest(message = '参数错误'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.BAD_REQUEST);
  }

  /**
   * 未授权 (401)
   */
  static unauthorized(message = '未授权，请先登录'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.UNAUTHORIZED);
  }

  /**
   * 禁止访问 (403)
   */
  static forbidden(message = '禁止访问'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.FORBIDDEN);
  }

  /**
   * 资源不存在 (404)
   */
  static notFound(message = '资源不存在'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.NOT_FOUND);
  }

  /**
   * 资源冲突 (409)
   */
  static conflict(message = '资源已存在'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.CONFLICT);
  }

  /**
   * 验证失败 (422)
   */
  static unprocessableEntity(message = '数据验证失败'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.UNPROCESSABLE_ENTITY);
  }

  /**
   * 服务不可用 (503)
   */
  static serviceUnavailable(message = '服务暂时不可用'): NextResponse<ApiResponse<null>> {
    return this.error(message, ResponseCode.SERVICE_UNAVAILABLE);
  }
}
