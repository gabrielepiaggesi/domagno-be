"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = exports.Path = exports.Get = exports.Delete = exports.Put = exports.Post = void 0;
require("reflect-metadata");
function Post() {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('METHOD', 'POST', target, propertyKey);
    };
    return decorator;
}
exports.Post = Post;
function Put() {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('METHOD', 'PUT', target, propertyKey);
    };
    return decorator;
}
exports.Put = Put;
function Delete() {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('METHOD', 'DELETE', target, propertyKey);
    };
    return decorator;
}
exports.Delete = Delete;
function Get() {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('METHOD', 'GET', target, propertyKey);
    };
    return decorator;
}
exports.Get = Get;
function Path(path) {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('PATH', path, target, propertyKey);
    };
    return decorator;
}
exports.Path = Path;
function Multer(config) {
    const decorator = (target, propertyKey, description) => {
        Reflect.defineMetadata('MULTER', config, target, propertyKey);
    };
    return decorator;
}
exports.Multer = Multer;
//# sourceMappingURL=HttpMehtodDecorators.js.map