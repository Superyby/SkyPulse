/**
 * 卫星数据 API 示例
 * 演示统一响应格式的使用方法
 */

import { ResponseUtil } from '@/lib/response';
import { NextRequest } from 'next/server';

// 模拟数据
const satellites = [
  { id: '1', name: 'ISS', altitude: 408, status: 'active' },
  { id: '2', name: 'Hubble', altitude: 547, status: 'active' },
  { id: '3', name: 'Sentinel-1', altitude: 693, status: 'active' },
];

/**
 * GET /api/satellites
 * 获取卫星列表（支持分页）
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // 模拟分页逻辑
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedList = satellites.slice(start, end);

    return ResponseUtil.paginated(
      paginatedList,
      page,
      pageSize,
      satellites.length,
      '获取卫星列表成功'
    );
  } catch (error) {
    console.error('获取卫星列表失败:', error);
    return ResponseUtil.error('获取卫星列表失败');
  }
}

/**
 * POST /api/satellites
 * 创建卫星
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 参数验证
    if (!body.name) {
      return ResponseUtil.badRequest('卫星名称不能为空');
    }

    if (!body.altitude || body.altitude <= 0) {
      return ResponseUtil.badRequest('轨道高度必须大于0');
    }

    // 模拟创建逻辑
    const newSatellite = {
      id: String(satellites.length + 1),
      name: body.name,
      altitude: body.altitude,
      status: body.status || 'active',
    };

    return ResponseUtil.created(newSatellite, '卫星创建成功');
  } catch (error) {
    console.error('创建卫星失败:', error);
    return ResponseUtil.error('创建卫星失败');
  }
}
