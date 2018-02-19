const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

process.noDeprecation = true

module.exports = options => ({
  entry: ['react-hot-loader/patch', ...options.entry],
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/'
    },
    options.output
  ),
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        loaders: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'cache-loader' },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: ['eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'typings-for-css-modules-loader',
            query: {
              sourceMap: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]_[hash:base64:5]',
              namedExport: true,
              camelCase: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              includePaths: [path.resolve(__dirname, '..', 'app', 'styles')]
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, '..', 'app', 'styles.scss')]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.html$/,
        loader: ['html-loader']
      },
      {
        test: /\.json$/,
        loader: ['json-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: ['file-loader']
      }
    ]
  },

  plugins: options.plugins.concat([
    // new TsConfigPathsPlugin({
    //   useCache: false,
    //   configFileName: `${__dirname}/app/tsconfig.json`,
    //   compiler: 'typescript'
    // }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch'
    }),

    new CopyWebpackPlugin([{ from: 'public' }]),
    // new CheckerPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),

  resolve: {
    modules: ['app', 'node_modules', 'app/assets', 'mock'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     // configFile: 'monkey.json'
    //     // useCache: false,
    //     configFile: `${__dirname}/app/tsconfig.json`
    //     // compiler: 'typescript'
    //   })
    // ]
  },
  target: 'web',
  performance: options.performance || {},
  devtool: options.devtool
})
