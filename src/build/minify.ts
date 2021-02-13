import glob from 'glob';
import { minify } from 'terser';
import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';
import { LINE, UTF, newDateMagenta, begin, finalizeFn } from './util';

export default class Minify {
    static async run() {
        const { sync } = glob;
        const allJ = sync('./dist/*.js');

        const filterAllJ = allJ.filter(filePath => !filePath.includes('bundle.js'))
            .filter(filePath => !filePath.endsWith('.spec.js'));

        for (const filePath of filterAllJ) {
            const readFile = await this._minify(filePath);
            writeFileSync(filePath, readFile, UTF);
        }

        finalizeFn();
    }


    private static async _minify(filePath: string) {
        const readFile = await minify(readFileSync(filePath, UTF), {});
        return readFile.code as string;
    }
}
