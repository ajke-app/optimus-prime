import { DynamicModule } from '@nestjs/common';
import Redis from 'ioredis';
export declare type RedisClient = Redis.Redis;
export interface RedisPubSubConnectionOptions {
    host?: string;
    port?: number;
    db?: string;
    password?: string;
}
export declare class RedisPubSubModule {
    static register(options?: RedisPubSubConnectionOptions): DynamicModule;
}
