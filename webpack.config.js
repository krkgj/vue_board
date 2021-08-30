const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
require("@babel/polyfill");

module.exports = {
	entry: {
		app: ["@babel/polyfill", path.join(__dirname, "main.js")],
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "dist"),
		// publicPath: "/dist",
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: "vue-loader" },
			{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
			{ test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "index.html"),
		}),
		new VueLoaderPlugin(),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: "assets/",
		// 			to: "",
		// 		},
		// 	],
		// }),
		new CleanWebpackPlugin(),
	],
	devServer: { port: 48121, open: false, hot: true },
	devtool: "eval",
	// devtool: "cheap-module-source-map",
};
