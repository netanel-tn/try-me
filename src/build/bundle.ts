import glob from 'glob';
import webpack, { Output } from 'webpack';
import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { pathFile, finalizeFn, BundleType, MAIN_DIR_PATH, NA } from './util';
import { exit } from 'process';

/**
  * Default With Version
  */
interface IDefWithVer {
    readonly default: {
        readonly version: string;
    };
}

const { sync } = glob;
const defLibrary: Output = {
    library: 'ntn_try_me',
    libraryTarget: 'var'
};

export default class Bundle {
    static run(bundleType: BundleType) {
        switch (bundleType) {
            case 'bundle':
                return this._makeBundle();
            case 'bundleDev':
                return this._makeBundleDev();
        }
    }

    private static async _makeBundle() {
        const prepareBundle = webpack({
            mode: 'production',
            entry: './dist/index.js',
            output: {
                ...pathFile('bundle', 'bundle.js'),
                ...defLibrary
            },
            plugins: [
                new webpack.BannerPlugin(await this._buildBannerText())
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
                ...defLibrary
            }
        });

        prepareBundle.run(() => finalizeFn())
    }

    private static async _buildBannerText() {
        try {
            const pjFilePath = pathToFileURL(resolve(MAIN_DIR_PATH, 'package.json')).href;
            const { default: { version: v } } = await import(pjFilePath) as IDefWithVer;

            return '=== ntn-try-me ==='
                + '\n' + 'v' + v
                + '\n' + 'By Netanel Tal Nizri';
        }
        catch {
            console.warn('WARN:'.yellow, '_buildBannerText'.bold, 'have failed.');

            return NA;
        }
    }
}
