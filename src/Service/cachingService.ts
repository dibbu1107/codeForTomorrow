import Redis from 'ioredis';

const redisClient = new Redis();

export const setCache = async (key: string, value: string, expiresInSeconds: number) => {
    try {
        if (expiresInSeconds > 0) {
            await redisClient.setex(key, expiresInSeconds, value);
        } else {
            await redisClient.set(key, value);
        }
    } catch (error) {
        console.error("Error setting cache:", error);
    }
};

export const getCache = async (key: string): Promise<string | null> => {
    try {
        const value = await redisClient.get(key);
        return value;
    } catch (error) {
        console.error("Error getting cache:", error);
        return null;
    }
};
