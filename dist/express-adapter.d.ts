import { RequestResponseAdapter } from './request-response-adapter';
export declare class ExpressAdapter implements RequestResponseAdapter {
    private readonly request;
    private readonly response;
    constructor(request: any, response: any);
    get route(): any;
    get path(): any;
    get method(): any;
    get protocol(): any;
    get statusCode(): any;
    get baseUrl(): any;
}
