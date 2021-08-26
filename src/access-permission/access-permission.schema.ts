import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccessPermissionDocument = AccessPermission & Document;

@Schema()
export class AccessPermission {
  @Prop()
  user?: String;

  @Prop({ default: [] })
  accesses?: String[];
}

export const AccessPermissionSchema =
  SchemaFactory.createForClass(AccessPermission);
