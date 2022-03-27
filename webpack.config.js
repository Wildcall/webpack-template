const path = require('path')
const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
    dist: path.join(__dirname, './dist'),
    src: path.join(__dirname, './src'),
    public: path.join(__dirname, 'public')
}

const commonConfig  = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: PATHS.dist,
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
      ]
}

const productionConfig  = {
    mode: "production",
}

const developmentConfig  = {
    mode: "development",
    devServer: {
        static: {
            directory: PATHS.public
        },
        client: {
            overlay: {
                warnings: true,
                errors: true
            },
          },
        compress: true,
        port: 9000
    }
}

module.exports = (env, args) => {
    switch(args.mode) {
        case 'development':
          return merge(commonConfig, developmentConfig);
        case 'production':
          return merge(commonConfig, productionConfig);
        default:
          console.log('No matching configuration was found!');
    }
}