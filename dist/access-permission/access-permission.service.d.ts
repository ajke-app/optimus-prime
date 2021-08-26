import { Model } from 'mongoose';
import { RedisPubSubService } from '../redis-pub-sub/redis.service';
import { AccessPermission } from './access-permission.schema';
export declare class AccessPermissionService {
    private readonly model;
    private readonly redis;
    constructor(model: Model<AccessPermission>, redis: RedisPubSubService);
    getAccessPermissions(user: String): Promise<String[]>;
    saveUserAccessPermissions(data: AccessPermission): Promise<AccessPermission>;
}
