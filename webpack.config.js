const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const { VeeValidate } = require("vee-validate");
require("@babel/polyfill");

// module.exports = {};

module.exports = (env, opts) => {
	const config = {
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
				{
					test: /\.scss$/,
					use: ["vue-style-loader", "css-loader", "sass-loader"],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "index.html"),
			}),
			new VueLoaderPlugin(),
			// new VeeValidate(),
			// new CopyPlugin({
			// 	patterns: [
			// 		{
			// 			from: "assets/",
			// 			to: "",
			// 		},
			// 	],
			// }),
		],
	};

	if (opts.mode === "development") {
		return merge(config, {
			devtool: "eval",
			devServer: { port: 48121, open: false, hot: true },
		});
	} else {
		return merge(config, {
			devtool: "cheap-module-source-map",
			plugins: [new CleanWebpackPlugin()],
		});
	}
};
