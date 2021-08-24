import { DynamicModule } from '@nestjs/common';
import { StatsDInterceptorOptions } from './statsd.interceptor';
export declare class StatsDInterceptorModule {
    static configure(options?: StatsDInterceptorOptions): DynamicModule;
}
