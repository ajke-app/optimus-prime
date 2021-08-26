import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisPubSubModule } from '../redis-pub-sub/redis.module';
import {
  AccessPermission,
  AccessPermissionSchema,
} from './access-permission.schema';
import { AccessPermissionService } from './access-permission.service';

export interface DbConnectionOptions {
  host?: string;
  port?: number;
  db?: string;
  password?: string;
  redisConfig?: RedisConnectionOptions;
}

export interface RedisConnectionOptions {
  host?: string;
  port?: number;
  db?: string;
  password?: string;
}
@Global()
@Module({})
export class AccessPermissionModule {
  static register(options?: DbConnectionOptions): DynamicModule {
    return {
      module: AccessPermissionModule,
      imports: [
        RedisPubSubModule.register({
          host: options?.redisConfig?.host,
          port: options?.redisConfig?.port,
        }),
        MongooseModule.forRoot(
          `mongodb://${options?.host || 'localhost'}:${
            options?.port || 27017
          }/${options?.db || 'sherlock_db'}`,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          }
        ),
        MongooseModule.forFeature([
          {
            name: AccessPermission.name,
            schema: AccessPermissionSchema,
          },
        ]),
      ],
      providers: [AccessPermissionService],
      exports: [AccessPermissionService],
    };
  }
}
