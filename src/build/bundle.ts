import webpack from 'webpack';
import { resolve } from 'path';
import glob from 'glob';
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

const defLibrary: any = {
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
                new webpack.BannerPlugin({
                    banner: await this._buildBannerText()
                })
            ]
        }, (err: any, stats: any) => {
            if (err || stats.hasErrors()) {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    return;
                }

                const info = stats.toJson();

                if (stats.hasErrors()) {
                    console.error(info.errors);
                }

                if (stats.hasWarnings()) {
                    console.warn(info.warnings);
                }
            }
        });

        prepareBundle.run(() => finalizeFn());
    }

    // Temp
    private static _makeBundleDev() {
        const { sync } = glob;
        const prepareBundle = webpack({
            mode: 'production',
            entry: sync('./dist/*.js'),
            output: {
                ...pathFile('dist/dev', 'bundle'),
                ...defLibrary
            }
        });

        prepareBundle.run(() => finalizeFn());
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
