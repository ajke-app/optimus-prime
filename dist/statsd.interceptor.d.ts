import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core/helpers/http-adapter-host';
import { StatsD } from 'hot-shots';
import { Observable } from 'rxjs';
import { RequestResponseAdapter } from './request-response-adapter';
export interface StatsDInterceptorOptions {
    statsD?: StatsD;
    stat?: string;
    tags?: string[];
    path?: boolean;
    baseUrl?: boolean;
    method?: boolean;
    protocol?: boolean;
    responseCode?: boolean;
    delim?: string;
    adapter?: (request: any, response: any) => RequestResponseAdapter;
}
export declare const STATSD_INTERCEPTOR_OPTIONS_PROVIDER = "STATSD_INTERCEPTOR_OPTIONS_PROVIDER";
export declare class StatsDInterceptor implements NestInterceptor {
    private readonly metricClient;
    private readonly stat;
    private readonly tags;
    private readonly path;
    private readonly baseUrl;
    private readonly method;
    private readonly protocol;
    private readonly responseCode;
    private readonly DELIM;
    private readonly REGEX_PIPE;
    private readonly adapter?;
    protected readonly httpAdapterHost?: HttpAdapterHost;
    constructor(options: StatsDInterceptorOptions);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    wrapRequest(request: any, response: any): RequestResponseAdapter;
    guessType(request: any): any;
    onResponse(context: HttpArgumentsHost, requestTime: [number, number]): void;
    replacePipeChar(str: string | RegExp): string;
    getRoute(adapter: RequestResponseAdapter): string;
}
