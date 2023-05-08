"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG = void 0;
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
class LOG {
}
LOG.log = (...args) => console.log('------------------', '\n', ...args);
LOG.info = (...args) => console.log('------------------', '\n', '\x1b[36m%s\x1b[0m', 'ⓘ info', ...args);
LOG.warn = (...args) => console.log('------------------', '\n', '\x1b[33m%s\x1b[0m', '⚠ warn', ...args);
LOG.success = (...args) => console.log('------------------', '\n', '\x1b[33m%s\x1b[0m', '✓ success:', ...args);
LOG.error = (...args) => console.log('------------------', '\n', '\x1b[31m', '💣 error:', ...args);
exports.LOG = LOG;
//# sourceMappingURL=Log.js.map