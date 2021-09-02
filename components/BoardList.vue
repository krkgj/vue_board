<template>
	<div class="app-table">
		<table>
			<colgroup>
				<col style="width: 10%" />
				<col style="width: 20%" />
				<col style="width: 25%" />
				<col style="width: 30%" />
				<col style="width: 10%" />
				<col style="width: 5%" />
			</colgroup>
			<thead>
				<tr>
					<th>NO</th>
					<th>CREATETIME</th>
					<th>TITLE</th>
					<th>CONTENTS</th>
					<th>TYPE</th>
					<th>삭제</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="data in arraySort" :key="data.no">
					<td>{{ data.no }}</td>
					<td>{{ data.createtime }}</td>
					<td>{{ data.title }}</td>
					<td>{{ data.contents }}</td>
					<td>{{ data.type }}</td>
					<td><button @click="deleteData(data.no)">삭제</button></td>
				</tr>
			</tbody>
		</table>

		<button class="btn-modal" id="show-modal" @click="showModal = true">
			글쓰기
		</button>
		<!-- @regist : 자식 컴포넌트에서 $emit('regist', 데이터)로 보낸 데이터를 다시 regist 메소드로 보냄. -->
		<board-modal
			:showModal="showModal"
			@closing="closing"
			@regist-data="registData"
		/>
	</div>
</template>

<script>
import axios from "axios";
import BoardModal from "./modals/BoardModal.vue";

// const dataAdjust = {
// 	data() {},
// };

// axios 객체 생성 전역으로.
const apiAxios = axios.create({
	baseURL: "http://local.ring2pay.com:9944",
});
export default {
	components: { BoardModal },
	data() {
		return {
			list: [],
			showModal: false,
		};
	},
	// Vue 인스턴스가 마운트된 후 호출된다.
	mounted() {
		apiAxios.get("/api/board").then((res) => {
			if (res.status === 200) {
				// res.data를 sort한다
				this.list = res.data;
			}
		});
	},
	// computed : 컴퓨틷 메소드는 data의 list가 변할 때마다 호출된다. 한 번 캐싱되어 변할 때만 호출되어짐.
	computed: {
		arraySort() {
			this.list.sort((a, b) => {
				console.log("call computed");
				return parseFloat(a.no) - parseFloat(b.no);
			});
			return this.list;
		},
	},
	methods: {
		// 등록
		registData(jsonData) {
			// axios(jQuery의 ajax 같은) 호출, 근데 2번째 인자가 data인데 왜 3번째 params에 넣어야 가는거지;?
			apiAxios.post("/api/board", null, { params: jsonData }).then((res) => {
				if (res.status === 200) {
					alert("등록 완료.");
					this.getList();
				}
				this.closing();
			});
		},
		// 삭제
		deleteData(number) {
			apiAxios.delete("/api/board/" + number).then((res) => {
				if (res.status === 200) {
					alert("삭제 완료");
					this.getList();
				}
			});
		},
		// 글 목록 가져옴
		getList() {
			apiAxios.get("/api/board").then((res) => {
				if (res.status === 200) {
					// res.data를 sort한다
					this.list = res.data;
				}
			});
		},
		closing() {
			this.showModal = false;
		},
	},
};
</script>

<style scoped lang="scss">
$color: red;
body {
	margin: 0;
}
div {
	box-sizing: border-box;
}
.black-bg {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	padding: 20px;
}
table {
	border-collapse: separate;
	border-spacing: 0;
	text-align: left;
	line-height: 1.5;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	margin: 0;
	width: 100%;
	height: 100%;
}
td {
	width: 350px;
	padding: 10px;
	vertical-align: top;
	border-right: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	color: $color;
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
.btn-modal {
	width: 80px;
	height: 30px;
}
.app-table {
	padding: 30px;
}
</style>
