import terser from 'terser';
import glob from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';
import { LINE, UTF, newDateMagenta, begin, finalizeFn } from './util';

export default class Minify {
    static run() {
        const { sync } = glob;
        const { minify } = terser;
        const allJ = sync('./dist/*.js');

        const filterAllJ = allJ.filter(filePath => !filePath.includes('bundle.js'))
            .filter(filePath => !filePath.endsWith('.spec.js'));

        filterAllJ.forEach(filePath => {
            const readFile = minify(readFileSync(filePath, UTF), {}).code;

            writeFileSync(filePath, readFile, UTF);
        });

        finalizeFn();
    }
}
