"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StatsDInterceptorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsDInterceptorModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const statsd_interceptor_1 = require("./statsd.interceptor");
const provider = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: statsd_interceptor_1.StatsDInterceptor,
};
let StatsDInterceptorModule = StatsDInterceptorModule_1 = class StatsDInterceptorModule {
    static configure(options = {}) {
        return {
            module: StatsDInterceptorModule_1,
            providers: [
                {
                    provide: statsd_interceptor_1.STATSD_INTERCEPTOR_OPTIONS_PROVIDER,
                    useValue: options,
                },
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: statsd_interceptor_1.StatsDInterceptor,
                },
            ],
        };
    }
};
StatsDInterceptorModule = StatsDInterceptorModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], StatsDInterceptorModule);
exports.StatsDInterceptorModule = StatsDInterceptorModule;
