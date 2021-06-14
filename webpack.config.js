const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    // 경로를 지정해줄때 .js, .vue를 지정 안해줘도 에러가 나지 않는다.
    extensions: ['.js', '.vue'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',  
  
  // 결과물(번들)을 반환하는 설정
  output: { 
    // path: path.resolve(__dirname, 'public'),  
    // filename: 'main.js', // entry이랑 동일한 파일
    clean: true  // 새롭게 build했을때 기존에있던 필요 없는 파일들을 지워준다
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, // .css 라고 끝나는 것을 찾는 정규 표현식
        use: [
          // 순서가 중요!
          'vue-style-loader',
          'style-loader', 
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],
  
  devServer: {
    host: 'localhost'
  }
}