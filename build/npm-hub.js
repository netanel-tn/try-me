import * as glob from 'glob';
import * as terser from 'terser';
import * as bundle from 'webpack';
import { argv, exit } from 'process';
import { LINE, UTF, ERR_ARGV, newDateMagenta, pathFile, begin } from './util.js';
import { readFileSync, writeFileSync } from 'fs';
// -------------- Fix --------------
const { sync } = glob;
const { minify } = terser;
const BUNDLE_FILE_NAME = 'bundle.js';
class VerHandling {
    static Verify(argv) {
        if (argv.find(x => x === 'v' || x === '--v')) { // `v` Might be Temp
            const readFile = readFileSync('./package.json', UTF);
            const { version: v } = JSON.parse(readFile);
            console.log(`v` + v);
            exit();
        }
    }
}
class TypeHandling {
    static Verify(argv) {
        if (!argv)
            throw new Error(ERR_ARGV);
        const type = argv.find(x => x.startsWith('--type='));
        if (!type)
            throw new Error(ERR_ARGV);
        return type.replace('--type=', '');
    }
}
// ...
VerHandling.Verify(argv);
const type = TypeHandling.Verify(argv);
const allJ = sync('./dist/*.js');
// ...
const finalizeFn = () => console.log(LINE, 'END  ', newDateMagenta(), LINE);
const minifyFn = () => {
    const filterAllJ = allJ.filter(x => !x.includes(BUNDLE_FILE_NAME))
        .filter(x => !x.endsWith('.spec.js'));
    filterAllJ.forEach(x => {
        const readFile = minify(readFileSync(x, UTF), {}).code;
        writeFileSync(x, readFile, UTF);
    });
    finalizeFn();
};
const bundleFn = (type) => {
    const igniteFn = (prepareBundle) => prepareBundle.run(() => finalizeFn());
    switch (type) {
        case 'bundle': {
            const prepareBundle = bundle({
                mode: 'production',
                entry: './dist/index.js',
                output: {
                    ...pathFile('bundle', BUNDLE_FILE_NAME),
                    library: 'ntn_try_me',
                    libraryTarget: 'var'
                },
                plugins: [
                    new bundle.BannerPlugin('=== ntn-try-me ===' + '\nBy Netanel Tal Nizri')
                ]
            });
            return igniteFn(prepareBundle);
        }
        case 'bundleDev': {
            const prepareBundle = bundle({
                mode: 'production',
                entry: allJ,
                output: {
                    ...pathFile('dist/dev', 'bundle'),
                    library: 'ntn_try_me',
                    libraryTarget: 'var'
                }
            });
            return igniteFn(prepareBundle);
        }
    }
};
// ...
begin();
switch (type) {
    case 'bundle':
    case 'bundleDev':
        bundleFn(type);
        break;
    case 'minify':
        minifyFn();
        break;
    case 'multiple':
        break;
    default:
        throw new Error(ERR_ARGV);
}
