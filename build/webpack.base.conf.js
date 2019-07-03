'use strict'
const path = require("path"),
  fs = require('fs')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

let entries = {};
let pageStr = resolve('src') + '/views/';

fs.readdirSync(pageStr).filter(function (folder) { //遍历pages
  var path = pageStr + folder;
  var stat = fs.lstatSync(path);
  if (stat.isDirectory()) {
    fs.readdirSync(path).filter(function (name) {
      var c_path = path + '/' + name;
      var c_stat = fs.lstatSync(c_path);
      if (c_stat.isDirectory()) {
        let jsPath = './src/views/' + folder + '/' + name + '/' + name + '.js';
        if (fs.existsSync(jsPath) && fs.statSync(jsPath).isFile()) {
          entries['views/' + folder + '/' + name] = [jsPath];
        }

      }
    });
  }
});
var baseStyle = [
  './src/less/global.less'
];
//entries['global'] = baseStyle;
//console.log(entries)
const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'views/app': ['./src/views/app.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@layout': resolve('src/components/layout'),
      '@public': resolve('public'),
      '@api': resolve('src/api/'),
    },
    //modules: ["E:\\vue\\node_modules", "/home/node/node_modules","spritesmith-generated"]
  },
  resolveLoader: {
    //modules: ["E:\\vue\\node_modules", "/home/node/node_modules"]
  },
  optimization: {
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10
        },
        commons: {
          name: 'commons',  // 提取出来的文件命名
          chunks: 'all', // 提取所有文件的公共部分
          test: /\.(less|css)$/,  // 只提取公共css ，命名可改styles
          minChunks: 2, // 表示提取公共部分最少的文件数
          minSize: 0  // 表示提取公共部分最小的大小
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 5,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //exclude: /(node_modules|bower_components)/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].css",
    //   chunkFilename: "[id].css"
    // })
    // 雪碧图设置
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "..", 'src/assets/icons/recommend/explain'), // 图标根路径
        glob: '**/*.png' // 匹配任意 png 图标
      },
      target: {
        image: path.resolve(__dirname, "..", 'src/assets/recommend/explain.png'), // 生成雪碧图目标路径与名称
        // 设置生成CSS背景及其定位的文件或方式
        css: [
          [path.resolve(__dirname, "..", 'src/style/css/icon/recommend/explain.css'), {
            format: 'function_based_template'
          }]
        ]
      },
      spritesmithOptions: {
        padding: 4,
      },
      customTemplates: {
        'function_based_template': function (data) {
          //console.log(data);
          let dpr = 2 * 100;
          const shared = '.wn-icon { background-image: url(I);background-size: BS;display: inline-block;vertical-align: middle;}'
          .replace('I', data.sprites[0].image)
          .replace('BS', data.spritesheet.width / dpr + "rem")
          // 注意：此处默认图标使用的是二倍图
          const perSprite = data.sprites.map(function (sprite) {
            // background-size: SWpx SHpx;
            return '.wn-icon-N {width: Wrem; height: Hrem; background-position: Xrem Yrem;}'
            .replace(/N/g, sprite.name)
            .replace(/W/g, sprite.width / dpr)
            .replace(/H/g, sprite.height / dpr)
            .replace(/X/g, sprite.offset_x / dpr)
            .replace(/Y/g, sprite.offset_y / dpr);
          }).join('\n');
          return shared + '\n' + perSprite;
        }
      },
      apiOptions: {
        cssImageRef: "/src/assets/recommend/explain.png", // css文件中引用雪碧图的相对位置路径配置
      },
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = webpackConfig
