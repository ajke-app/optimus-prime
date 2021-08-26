import { Observable } from 'rxjs';
import { RedisClient } from './redis.module';
export interface RedisSubscribeMessage {
    readonly message: string;
    readonly channel: string;
}
export declare class RedisPubSubService {
    private readonly redisSubscriberClient;
    private readonly redisPublisherClient;
    constructor(redisSubscriberClient: RedisClient, redisPublisherClient: RedisClient);
    fromEvent<T extends any>(eventName: string): Observable<T>;
    publish(channel: string, value: unknown): Promise<number>;
}
