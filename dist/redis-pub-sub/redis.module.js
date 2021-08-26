"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisPubSubModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisPubSubModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const redis_constants_1 = require("./redis.constants");
const redis_service_1 = require("./redis.service");
let RedisPubSubModule = RedisPubSubModule_1 = class RedisPubSubModule {
    static register(options) {
        return {
            module: RedisPubSubModule_1,
            providers: [
                {
                    useFactory: () => {
                        return new ioredis_1.default({
                            host: (options === null || options === void 0 ? void 0 : options.host) || 'localhost',
                            port: (options === null || options === void 0 ? void 0 : options.port) || 6379,
                        });
                    },
                    provide: redis_constants_1.REDIS_SUBSCRIBER_CLIENT,
                },
                {
                    useFactory: () => {
                        return new ioredis_1.default({
                            host: (options === null || options === void 0 ? void 0 : options.host) || 'localhost',
                            port: (options === null || options === void 0 ? void 0 : options.port) || 6379,
                        });
                    },
                    provide: redis_constants_1.REDIS_PUBLISHER_CLIENT,
                },
                redis_service_1.RedisPubSubService,
            ],
            exports: [redis_service_1.RedisPubSubService],
        };
    }
};
RedisPubSubModule = RedisPubSubModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], RedisPubSubModule);
exports.RedisPubSubModule = RedisPubSubModule;
//# sourceMappingURL=redis.module.js.map