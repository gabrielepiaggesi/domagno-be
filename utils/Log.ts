// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
export class LOG {
    public static log = (...args) => console.log('------------------', '\n', ...args);
    public static info = (...args) => console.log('------------------', '\n', '\x1b[36m%s\x1b[0m', 'ⓘ info', ...args);
    public static warn = (...args) => console.log('------------------', '\n', '\x1b[33m%s\x1b[0m', '⚠ warn', ...args);
    public static success = (...args) => console.log('------------------', '\n', '\x1b[33m%s\x1b[0m', '✓ success:', ...args);
    public static error = (...args) => console.log('------------------', '\n', '\x1b[31m', '💣 error:', ...args);
}
