"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccessPermissionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessPermissionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const redis_module_1 = require("../redis-pub-sub/redis.module");
const access_permission_schema_1 = require("./access-permission.schema");
const access_permission_service_1 = require("./access-permission.service");
let AccessPermissionModule = AccessPermissionModule_1 = class AccessPermissionModule {
    static register(options) {
        var _a, _b;
        return {
            module: AccessPermissionModule_1,
            imports: [
                redis_module_1.RedisPubSubModule.register({
                    host: (_a = options === null || options === void 0 ? void 0 : options.redisConfig) === null || _a === void 0 ? void 0 : _a.host,
                    port: (_b = options === null || options === void 0 ? void 0 : options.redisConfig) === null || _b === void 0 ? void 0 : _b.port,
                }),
                mongoose_1.MongooseModule.forRoot(`mongodb://${(options === null || options === void 0 ? void 0 : options.host) || 'localhost'}:${(options === null || options === void 0 ? void 0 : options.port) || 27017}/${(options === null || options === void 0 ? void 0 : options.db) || 'sherlock_db'}`, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                }),
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: access_permission_schema_1.AccessPermission.name,
                        schema: access_permission_schema_1.AccessPermissionSchema,
                    },
                ]),
            ],
            providers: [access_permission_service_1.AccessPermissionService],
            exports: [access_permission_service_1.AccessPermissionService],
        };
    }
};
AccessPermissionModule = AccessPermissionModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], AccessPermissionModule);
exports.AccessPermissionModule = AccessPermissionModule;
//# sourceMappingURL=access-permission.module.js.map