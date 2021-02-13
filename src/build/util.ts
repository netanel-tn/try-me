import moment from 'moment';
import { resolve } from 'path';
import 'colors';

// -------------- Type --------------
export type BundleType = 'bundle' | 'bundleDev';
export type NpmHubType = BundleType & 'minify';

export const LINE = '--------------';
export const UTF = 'utf8';
export const NA = 'N/A';
export const MAIN_DIR_PATH = resolve();

export const newDate = () => moment().format('DD/MM/YYYY HH:mm:ss:SS');
export const newDateMagenta = () => newDate().magenta;
export const indent = (n = 1) => ' '.repeat(n);
export const pathFile = (path: string, filename: string) => ({
    path: resolve(MAIN_DIR_PATH, path),
    filename
});

// -------------- Debug --------------
export const begin = () => console.log(LINE, 'BEGIN', newDateMagenta(), LINE);
export const finalizeFn = () => console.log(LINE, 'END  ', newDateMagenta(), LINE);
