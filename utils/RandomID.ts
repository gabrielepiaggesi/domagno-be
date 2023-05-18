import { customAlphabet } from 'nanoid';

// https://zelark.github.io/nano-id-cc/

export class RandomID {
    static generate(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const nanoid = customAlphabet(alphabet, 8);
        return nanoid();
    }
}