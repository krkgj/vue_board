<template>
	<div>
		<!-- <button @click="boardList">호출!</button> -->

		<table>
			<tr>
				<th>NO</th>
				<th>CREATETIME</th>
				<th>TITLE</th>
				<th>CONTENTS</th>
				<th>TYPE</th>
			</tr>
			<tr v-for="data in list" :key="data.no">
				<td>{{ data.no }}</td>
				<td>{{ data.createtime }}</td>
				<td>{{ data.title }}</td>
				<td>{{ data.contents }}</td>
				<td>{{ data.type }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import axios from "axios";

const apiUrl = "http://local.ring2pay.com:9944/api/board";

export default {
	data() {
		return {
			list: [],
		};
	},
	mounted() {
		axios.get(apiUrl).then((res) => {
			this.list = res.data;
		});
	},
	methods: {
		registry() {
			axios.post(apiUrl).then((res) => {});
		},
		remove() {
			axios.post(apiUrl, {}).then((res) => {});
		},
		getList() {
			axios.get(apiUrl).then((res) => {});
		},
	},
};
</script>

<style scoped>
table {
	border-collapse: separate;
	border-spacing: 0;
	text-align: left;
	line-height: 1.5;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	margin: 20px 10px;
	width: 100%;
	height: 100%;
}
td {
	width: 350px;
	padding: 10px;
	vertical-align: top;
	border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
}
th {
	width: 150px;
	padding: 10px;
	font-weight: bold;
	vertical-align: top;
	border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	border-top: 1px solid #fff;
	border-left: 1px solid #fff;
	background: #eee;
}
</style>
