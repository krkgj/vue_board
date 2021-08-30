<template>
	<div>
		<button @click="callAxios">호출!</button>
		<ul v-for="data in list" :key="data.no">
			<li>{{ data.contents }}</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			list: [],
		};
	},
	methods: {
		callAxios: function() {
			console.log("실행!");
			const apiUrl = "http://local.ring2pay.com:9944/api/board";
			axios.get(`${apiUrl}`).then((res) => {
				console.log(res.data);
				this.list = res.data;
			});
		},
	},
};
</script>
