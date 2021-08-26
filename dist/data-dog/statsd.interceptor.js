"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsDInterceptor = exports.STATSD_INTERCEPTOR_OPTIONS_PROVIDER = void 0;
const common_1 = require("@nestjs/common");
const http_adapter_host_1 = require("@nestjs/core/helpers/http-adapter-host");
const hot_shots_1 = require("hot-shots");
const operators_1 = require("rxjs/operators");
const express_adapter_1 = require("./express-adapter");
exports.STATSD_INTERCEPTOR_OPTIONS_PROVIDER = 'STATSD_INTERCEPTOR_OPTIONS_PROVIDER';
const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
let StatsDInterceptor = class StatsDInterceptor {
    constructor(options) {
        this.metricClient = options.statsD || new hot_shots_1.StatsD();
        this.stat = options.stat || 'node.express.router';
        this.tags = options.tags || [];
        this.path = options.path || false;
        this.baseUrl = options.baseUrl || false;
        this.method = options.method || false;
        this.protocol = options.protocol || false;
        this.responseCode = options.responseCode || false;
        this.DELIM = options.delim || '-';
        this.REGEX_PIPE = /\|/g;
        this.adapter = options.adapter;
    }
    intercept(context, next) {
        const requestTime = process.hrtime();
        const httpContext = context.switchToHttp();
        return next
            .handle()
            .pipe(operators_1.tap((x) => this.onResponse(httpContext, requestTime)));
    }
    wrapRequest(request, response) {
        if (this.adapter) {
            return this.adapter(request, response);
        }
        const type = this.guessType(request);
        if (type === 'express') {
            return new express_adapter_1.ExpressAdapter(request, response);
        }
        else {
            throw new Error('Unhandled http adapter type ' + type);
        }
    }
    guessType(request) {
        if (this.httpAdapterHost) {
            const httpAdapter = this.httpAdapterHost.httpAdapter;
            return httpAdapter.getType();
        }
        else {
            return 'express';
        }
    }
    onResponse(context, requestTime) {
        const responseTime = process.hrtime();
        const [seconds1, microSeconds1] = requestTime;
        const [seconds2, microSeconds2] = responseTime;
        const startTime = Math.round(seconds1 * 1000 + microSeconds1 / 1e6);
        const endTime = Math.round(seconds2 * 1000 + microSeconds2 / 1e6);
        const statTags = [...this.tags];
        const req = context.getRequest();
        const res = context.getResponse();
        const adapter = this.wrapRequest(req, res);
        const route = this.getRoute(adapter);
        if (route.length > 0) {
            statTags.push(`route:${route}`);
        }
        if (this.method !== false) {
            const method = adapter.method;
            statTags.push(`method:${method.toLowerCase()}`);
        }
        if (this.protocol && adapter.protocol) {
            statTags.push(`protocol:${adapter.protocol}`);
        }
        if (this.path !== false) {
            statTags.push(`path:${adapter.path}`);
        }
        if (this.responseCode) {
            const statusCode = adapter.statusCode;
            statTags.push(`response_code:${statusCode}`);
            this.metricClient.increment(`${this.stat}.response_code.${statusCode}`, 1, statTags);
            this.metricClient.increment(`${this.stat}.response_code.all`, 1, statTags);
        }
        this.metricClient.histogram(`${this.stat}.response_time`, endTime - startTime, 1, statTags);
    }
    replacePipeChar(str) {
        if (str instanceof RegExp) {
            str = str.toString();
        }
        return str && str.replace(this.REGEX_PIPE, this.DELIM);
    }
    getRoute(adapter) {
        const routePath = adapter.route;
        const normalizedBaseUrl = this.baseUrl ? adapter.baseUrl : '';
        return normalizedBaseUrl + this.replacePipeChar(routePath);
    }
};
__decorate([
    common_1.Optional(),
    common_1.Inject(HTTP_ADAPTER_HOST),
    __metadata("design:type", http_adapter_host_1.HttpAdapterHost)
], StatsDInterceptor.prototype, "httpAdapterHost", void 0);
StatsDInterceptor = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(exports.STATSD_INTERCEPTOR_OPTIONS_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], StatsDInterceptor);
exports.StatsDInterceptor = StatsDInterceptor;
//# sourceMappingURL=statsd.interceptor.js.map