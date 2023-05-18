"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomID = void 0;
const nanoid_1 = require("nanoid");
// https://zelark.github.io/nano-id-cc/
class RandomID {
    static generate() {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 8);
        return nanoid();
    }
}
exports.RandomID = RandomID;
//# sourceMappingURL=RandomID.js.map