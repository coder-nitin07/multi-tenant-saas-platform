import { createClient } from 'redis';
import 'dotenv/config';

const connection = {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
};

const redisClient = createClient(connection);

redisClient.on('error', (err)=>{
    console.log('Redis Error', err);
});

async function connectRedis(){
    await redisClient.connect();
};

export { redisClient, connectRedis, connection };