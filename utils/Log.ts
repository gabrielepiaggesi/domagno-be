// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
export class LOG {
    public static log = (...args) => console.log('------------------', '\n', ...args);
    public static info = (...args) => {
        console.log('------------------');
        console.log('\x1b[36m%s\x1b[0m', 'ⓘ info');
        console.log('\x1b[36m%s\x1b[0m', ...args);
    }
    public static warn = (...args) => {
        console.log('------------------');
        console.log('\x1b[33m%s\x1b[0m', '⚠ warn');
        console.log('\x1b[33m%s\x1b[0m', ...args);
    };
    public static success = (...args) => {
        console.log('------------------');
        console.log('\x1b[33m%s\x1b[0m', '✓ success:');
        console.log('\x1b[33m%s\x1b[0m', ...args);
    };
    public static error = (...args) => {
        console.log('------------------');
        console.log('\x1b[31m', '💣 error:');
        console.log('\x1b[31m', ...args);
    };
}
