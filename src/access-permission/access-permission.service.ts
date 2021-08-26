import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_PERMISSION_MODIFIED } from '../constants';
import { RedisPubSubService } from '../redis-pub-sub/redis.service';
import { AccessPermission } from './access-permission.schema';

@Injectable()
export class AccessPermissionService {
  constructor(
    @InjectModel(AccessPermission.name)
    private readonly model: Model<AccessPermission>,
    private readonly redis: RedisPubSubService
  ) {
    this.redis
      .fromEvent(USER_PERMISSION_MODIFIED)
      .subscribe(async (accessPermissions: AccessPermission) => {
        console.log(accessPermissions);
        await this.saveUserAccessPermissions(accessPermissions);
      });
  }

  async getAccessPermissions(user: String): Promise<String[]> {
    try {
      const permissions: AccessPermission = await this.model
        .findOne({ user })
        .exec();
      return permissions.accesses;
    } catch (error) {
      return error;
    }
  }

  async saveUserAccessPermissions(
    data: AccessPermission
  ): Promise<AccessPermission> {
    try {
      const isExist = await this.model.findOne({ user: data.user }).exec();
      if (isExist) {
        await this.model
          .updateOne({ user: data.user }, { accesses: data.accesses })
          .exec();
      } else {
        const newData = new this.model(data);
        return await newData.save();
      }
    } catch (error) {
      return error;
    }
  }
}
