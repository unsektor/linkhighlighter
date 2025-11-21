import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const libraryName = 'linkhighlighter';

const configs = [
    // UMD (AMD, require, global)
    {
        entry: './src/linkhighlighter.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'linkhighlighter.umd.js',
            library: {
                name: libraryName,
                type: 'umd'
            },
            globalObject: 'this'
        },
        resolve: {
            extensions: ['.ts']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }]
        }
    },
    // ES Module
    {
        entry: './src/linkhighlighter.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'linkhighlighter.esm.js',
            library: {
                type: 'module'
            }
        },
        experiments: {
            outputModule: true
        },
        resolve: {
            extensions: ['.ts']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }]
        }
    },
];

export default (env, argv) => {
    const isProduction = argv.mode === 'production';

    return configs.map(config => ({
        ...config,
        mode: argv.mode || 'development',
        optimization: {
            minimize: isProduction
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map'
    }));
};