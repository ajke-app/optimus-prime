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
exports.AccessPermissionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
const redis_service_1 = require("../redis-pub-sub/redis.service");
const access_permission_schema_1 = require("./access-permission.schema");
let AccessPermissionService = class AccessPermissionService {
    constructor(model, redis) {
        this.model = model;
        this.redis = redis;
        this.redis
            .fromEvent(constants_1.USER_PERMISSION_MODIFIED)
            .subscribe(async (accessPermissions) => {
            console.log(accessPermissions);
            await this.saveUserAccessPermissions(accessPermissions);
        });
    }
    async getAccessPermissions(user) {
        try {
            const permissions = await this.model
                .findOne({ user })
                .exec();
            return permissions.accesses;
        }
        catch (error) {
            return error;
        }
    }
    async saveUserAccessPermissions(data) {
        try {
            const isExist = await this.model.findOne({ user: data.user }).exec();
            if (isExist) {
                await this.model
                    .updateOne({ user: data.user }, { accesses: data.accesses })
                    .exec();
            }
            else {
                const newData = new this.model(data);
                return await newData.save();
            }
        }
        catch (error) {
            return error;
        }
    }
};
AccessPermissionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(access_permission_schema_1.AccessPermission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        redis_service_1.RedisPubSubService])
], AccessPermissionService);
exports.AccessPermissionService = AccessPermissionService;
//# sourceMappingURL=access-permission.service.js.map