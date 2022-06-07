const path = require( 'path' );

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve( __dirname, './src/public/js/app.js' ),
        svg: path.resolve( __dirname, './src/public/js/svg.js' )
    },
    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, './src/public/dist' ),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
                    }
                }
            },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {
                        // make loader to behave like url-loader, for all svg files
                        encoding: "base64",
                    },
                },
            }
        ]
    }
};