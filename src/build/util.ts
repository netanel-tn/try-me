import moment from 'moment';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'colors';

export const dirName = resolve(dirname(fileURLToPath(import.meta.url)), '../');

export type BundleType = 'bundle' | 'bundleDev';
export type NpmHubType = BundleType & 'minify';

export const LINE = '--------------';
export const UTF = 'utf8';

export const ERR_ARGV = '`argv` are invalid!';

export const newDate = () => moment().format('DD/MM/YYYY HH:mm:ss:SS');
export const newDateMagenta = () => newDate().magenta;
export const indent = (n = 1) => ' '.repeat(n);

export const pathFile = (path: string, filename: string) => ({
    path: resolve(resolve(), path),
    filename
});

export const begin = () => console.log(LINE, 'BEGIN', newDateMagenta(), LINE);
export const finalizeFn = () => console.log(LINE, 'END  ', newDateMagenta(), LINE);
