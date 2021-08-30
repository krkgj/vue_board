import Vue from "vue";
import App from "./App.vue";

new Vue({
	el: "#app",
	// render(createElement) {
	// 	return createElement(App);
	// },

	// 위 render 함수와 동의어
	render: (h) => h(App),
});
