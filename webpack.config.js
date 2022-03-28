const path = require('path')
const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyLoaderPlugin } = require('vuetify-loader')

const PATHS = {
    entry: path.join(__dirname, 'src', 'index.js'),
    dist: path.join(__dirname, './dist'),
    src: path.join(__dirname, './src'),
    public: path.join(__dirname, 'public')
}

const commonConfig  = {
    entry: {
        app: PATHS.entry
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
                exclude: '/node_modules/',
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      implementation: require('sass'),
                      indentedSyntax: true
                    },
                    options: {
                      implementation: require('sass'),
                      sassOptions: {
                        indentedSyntax: true
                      },
                    },
                  },
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin()
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