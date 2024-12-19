import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Test the database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
    
    // simple query to verify connection
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Query test successful:', result);
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection();

export default prisma;
