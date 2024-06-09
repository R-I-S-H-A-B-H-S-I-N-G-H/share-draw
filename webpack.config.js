const HtmlWebpackPlugin = require("html-webpack-plugin");

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
