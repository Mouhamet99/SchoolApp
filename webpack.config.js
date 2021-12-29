const path = require('path');

module.exports = {
   context: path.resolve(__dirname, './'),
   entry: ["regenerator-runtime/runtime.js", './src/js/app.js'],
   // entry: {
   //    home: './src/js/app.js',
   //    students: './src/js/apprenant.js',
   // },
   experiments: {
      outputModule: true,
   },
   output: {
      module: true,
      asyncChunks: true,
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),

   },
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
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
               }
            }
         }
      ]

   }
};