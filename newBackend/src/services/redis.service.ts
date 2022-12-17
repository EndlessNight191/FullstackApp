import { createClient } from "redis";

class RedisService {
  static client: any;

  static connect(){
    this.client = createClient({
      url: 'redis://alice:foobared@awesome.redis.server:6380'
    });
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect();
  }

  static async disconnect(){
    await this.client.disconnect();
    console.log('Redis disconnect success')
  }

  static async set({ key, value, timeType, time }) {
    await this.client.set(key, value, timeType, time);
  }

  static async get(key) {
    return await this.client.get(key);
  }

}

export default RedisService


