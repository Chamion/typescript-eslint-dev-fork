"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const config_1 = __importDefault(require("./rules/config"));
/**
 * Expose a single rule called "config", which will be accessed in the user's eslint config files
 * via "tslint/config"
 */
exports.rules = {
    config: config_1.default,
};
//# sourceMappingURL=index.js.map