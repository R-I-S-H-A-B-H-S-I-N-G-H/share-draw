const HtmlWebpackPlugin = require("html-webpack-plugin");
const StylexPlugin = require("@stylexjs/webpack-plugin");
const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new StylexPlugin({
			filename: "styles.css",
			// get webpack mode and set value for dev
			// Use statically generated CSS files and not runtime injected CSS.
			// Even in development.
			runtimeInjection: false,
			// optional. default: 'x'
			classNamePrefix: "x",
			// Required for CSS variable support
			unstable_moduleResolution: {
				// type: 'commonJS' | 'haste'
				// default: 'commonJS'
				type: "commonJS",
				// The absolute path to the root directory of your project
				rootDir: __dirname,
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
	],
	output: {
		publicPath: "/",
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		static: "./dist",
	},
};
