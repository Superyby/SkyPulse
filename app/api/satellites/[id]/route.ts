/**
 * 单个卫星 API 示例
 * 演示动态路由的统一响应格式
 */

import { ResponseUtil } from '@/lib/response';

// 模拟数据
const satellites = [
  { id: '1', name: 'ISS', altitude: 408, status: 'active' },
  { id: '2', name: 'Hubble', altitude: 547, status: 'active' },
  { id: '3', name: 'Sentinel-1', altitude: 693, status: 'active' },
];

/**
 * GET /api/satellites/[id]
 * 获取单个卫星详情
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const satellite = satellites.find((s) => s.id === id);

    if (!satellite) {
      return ResponseUtil.notFound('卫星不存在');
    }

    return ResponseUtil.success(satellite, '获取卫星详情成功');
  } catch (error) {
    console.error('获取卫星详情失败:', error);
    return ResponseUtil.error('获取卫星详情失败');
  }
}

/**
 * PUT /api/satellites/[id]
 * 更新卫星信息
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const satelliteIndex = satellites.findIndex((s) => s.id === id);

    if (satelliteIndex === -1) {
      return ResponseUtil.notFound('卫星不存在');
    }

    // 参数验证
    if (body.altitude !== undefined && body.altitude <= 0) {
      return ResponseUtil.badRequest('轨道高度必须大于0');
    }

    // 模拟更新逻辑
    const updatedSatellite = {
      ...satellites[satelliteIndex],
      ...body,
      id, // 确保 id 不被修改
    };

    return ResponseUtil.success(updatedSatellite, '卫星更新成功');
  } catch (error) {
    console.error('更新卫星失败:', error);
    return ResponseUtil.error('更新卫星失败');
  }
}

/**
 * DELETE /api/satellites/[id]
 * 删除卫星
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const satelliteIndex = satellites.findIndex((s) => s.id === id);

    if (satelliteIndex === -1) {
      return ResponseUtil.notFound('卫星不存在');
    }

    // 模拟删除逻辑
    // satellites.splice(satelliteIndex, 1);

    return ResponseUtil.success(null, '卫星删除成功');
  } catch (error) {
    console.error('删除卫星失败:', error);
    return ResponseUtil.error('删除卫星失败');
  }
}
