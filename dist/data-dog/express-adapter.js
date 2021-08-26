"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAdapter = void 0;
class ExpressAdapter {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    get route() {
        return this.request.route && this.request.route.path
            ? this.request.route.path
            : '';
    }
    get path() {
        return this.request.path;
    }
    get method() {
        return this.request.method;
    }
    get protocol() {
        return this.request.protocol;
    }
    get statusCode() {
        return this.response.statusCode;
    }
    get baseUrl() {
        return this.request.baseUrl;
    }
}
exports.ExpressAdapter = ExpressAdapter;
//# sourceMappingURL=express-adapter.js.map