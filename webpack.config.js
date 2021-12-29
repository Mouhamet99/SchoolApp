const path = require('path');

module.exports = {
   context: path.resolve(__dirname, './'),
   entry: ["regenerator-runtime/runtime.js", './src/js/apprenant.js', './src/js/app.js'],
   experiments: {
      outputModule: true,
   },
   output: {
      module: true,
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
   },
   devtool: 'eval-source-map',
   mode: 'development',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
               }
            }
         }
      ]

   },
};