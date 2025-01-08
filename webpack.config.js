const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtensionManifestPlugin = require('webpack-extension-manifest-plugin');

module.exports = {
  mode: 'development', // Or 'production'
  entry: {
    background: './src/background.ts',   // Changed to .ts
    content: './src/content.ts',         // Changed to .ts
    popup: './src/popup.ts',             // Changed to .ts (if you have a popup)
  },
  output: {
    filename: '[name].js',               // Webpack will output .js files
    path: path.resolve(__dirname, 'dist'),
    clean: true,                          // Clean dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,                  // Handle .ts and .tsx files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',            // Use ts-loader for TypeScript files
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],  // Handle .ts, .tsx, and .js files
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup.html',       // If you have a popup HTML
      filename: 'popup.html',
    }),
    new ExtensionManifestPlugin({
      config: {
        manifest_version: 3,
        name: 'My TypeScript Extension',
        version: '1.0',
        description: 'A Chrome extension built with TypeScript and Webpack.',
        background: {
          service_worker: 'background.js', // Webpack outputs JS files
        },
        permissions: ['activeTab'],
        action: {
          default_popup: 'popup.html',
        },
        content_scripts: [
          {
            matches: ['<all_urls>'],
            js: ['content.js'],
          },
        ],
      },
    }),
  ],
  devtool: 'source-map',                 // Enable source maps for easier debugging
};
