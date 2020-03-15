import webpack from 'webpack';
import glob from 'glob';
import { LINE, newDateMagenta, pathFile, begin, finalizeFn, BundleType } from './util.js';

const { sync } = glob;

export default class Bundle {
    static run(type: BundleType) {
        switch (type) {
            case 'bundle':
                this._makeBundle();
                break;
            case 'bundleDev':
                this._makeBundleDev();
                break;
        }
    }

    private static _makeBundle() {
        const prepareBundle = webpack({
            mode: 'production',
            entry: './dist/index.js',
            output: {
                ...pathFile('bundle', 'bundle.js'),
                library: 'ntn_try_me',
                libraryTarget: 'var'
            },
            plugins: [
                new webpack.BannerPlugin('=== ntn-try-me ===' + '\nBy Netanel Tal Nizri')
            ]
        });

        prepareBundle.run(() => finalizeFn())
    }

    private static _makeBundleDev() {
        const prepareBundle = webpack({
            mode: 'production',
            entry: sync('./dist/*.js'),
            output: {
                ...pathFile('dist/dev', 'bundle'),
                library: 'ntn_try_me',
                libraryTarget: 'var'
            }
        });

        prepareBundle.run(() => finalizeFn())
    }
}
