import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants';
import { RedisPubSubService } from './redis.service';

export type RedisClient = Redis.Redis;
export interface RedisPubSubConnectionOptions {
  host?: string;
  port?: number;
  db?: string;
  password?: string;
}
@Global()
@Module({})
export class RedisPubSubModule {
  static register(options?: RedisPubSubConnectionOptions): DynamicModule {
    return {
      module: RedisPubSubModule,
      providers: [
        {
          useFactory: (): RedisClient => {
            return new Redis({
              host: options?.host || 'localhost',
              port: options?.port || 6379,
            });
          },
          provide: REDIS_SUBSCRIBER_CLIENT,
        },
        {
          useFactory: (): RedisClient => {
            return new Redis({
              host: options?.host || 'localhost',
              port: options?.port || 6379,
            });
          },
          provide: REDIS_PUBLISHER_CLIENT,
        },
        RedisPubSubService,
      ],
      exports: [RedisPubSubService],
    };
  }
}
