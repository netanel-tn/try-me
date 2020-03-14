import * as moment from 'moment';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'colors';
const dirName = resolve(dirname(fileURLToPath(import.meta.url)), '../');
export const LINE = '--------------';
export const UTF = 'utf8';
export const ERR_ARGV = '`argv` are invalid!';
export const newDate = () => moment().format('DD/MM/YYYY HH:mm:ss:SS');
export const newDateMagenta = () => newDate().magenta;
export const indent = (n = 1) => ' '.repeat(n);
export const pathFile = (path, filename) => ({
    path: resolve(resolve(), path),
    filename
});
export const begin = () => console.log(LINE, 'BEGIN', newDateMagenta(), LINE);
export const finalizeFn = () => console.log(LINE, 'END  ', newDateMagenta(), LINE);
