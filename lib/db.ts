import { PrismaClient } from '@prisma/client';

// 防止开发环境热更新时创建多个 PrismaClient 实例
const globalForPrisma = global as unknown as { 
  prisma: PrismaClient 
};

export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// 优雅关闭连接
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});