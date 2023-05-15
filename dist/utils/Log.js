"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG = void 0;
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
class LOG {
}
LOG.log = (...args) => console.log('------------------', '\n', ...args);
LOG.info = (...args) => {
    console.log('------------------');
    console.log('\x1b[36m%s\x1b[0m', 'ⓘ info');
    console.log('\x1b[36m%s\x1b[0m', ...args);
};
LOG.warn = (...args) => {
    console.log('------------------');
    console.log('\x1b[33m%s\x1b[0m', '⚠ warn');
    console.log('\x1b[33m%s\x1b[0m', ...args);
};
LOG.success = (...args) => {
    console.log('------------------');
    console.log('\x1b[33m%s\x1b[0m', '✓ success:');
    console.log('\x1b[33m%s\x1b[0m', ...args);
};
LOG.error = (...args) => {
    console.log('------------------');
    console.log('\x1b[31m', '💣 error:');
    console.log('\x1b[31m', ...args);
};
exports.LOG = LOG;
//# sourceMappingURL=Log.js.map