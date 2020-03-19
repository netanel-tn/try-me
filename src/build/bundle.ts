import webpack, { Output } from 'webpack';
import glob from 'glob';
import { LINE, newDateMagenta, pathFile, begin, finalizeFn, BundleType } from './util';

const { sync } = glob;
const lib: Output = {
    library: 'ntn_try_me',
    libraryTarget: 'var'
};

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
                ...lib
            },
            plugins: [
                new webpack.BannerPlugin(this._banner)
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
                ...lib
            }
        });

        prepareBundle.run(() => finalizeFn())
    }

    private static get _banner() {
        return '=== ntn-try-me ==='
            + '\n' + 'By Netanel Tal Nizri';
    }
}
