import { Document } from 'mongoose';
export declare type AccessPermissionDocument = AccessPermission & Document;
export declare class AccessPermission {
    user?: String;
    accesses?: String[];
}
export declare const AccessPermissionSchema: import("mongoose").Schema<Document<AccessPermission, any, any>, import("mongoose").Model<Document<AccessPermission, any, any>, any, any>, undefined, {}>;
