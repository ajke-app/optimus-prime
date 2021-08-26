import { DynamicModule } from '@nestjs/common';
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
export declare class AccessPermissionModule {
    static register(options?: DbConnectionOptions): DynamicModule;
}
