import { customAlphabet } from 'nanoid';

// https://zelark.github.io/nano-id-cc/
// https://stackoverflow.com/questions/70865639/how-to-install-nanoid-in-nodejs

export class RandomID {
    static generate(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = customAlphabet(alphabet, 8);
        return nanoid();
    }
}