<template scope="myProps">
	<!-- v-if문으로 showModal이 true일 때만 보여진다. -->
	<div v-if="showModal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<header class="modal-header">
						<!-- v-model : input에 입력시에 modalTitle의 데이터가 자동으로 바인딩된다. 즉, 입력할때마다 데이터가 자동으로 바뀜. -->
						<slot> {{ modalHeader }}<input v-model="modalTitle" /> </slot>
					</header>

					<div class="modal-body">
						<div>
							<slot name="body">
								{{ modalBody }} <textarea v-model="modalContents" />
							</slot>
						</div>
						<div>
							<slot> {{ modalFooter }} <input v-model="modalType"/></slot>
						</div>
						<button class="modal-default-button" @click="registData">
							등록
						</button>
						<!-- $emit : 자식 컴포넌트에서 부모 컴포넌트로 데이터를 보낼 때 사용, 부모 컴포넌트에서 @closing 으로 받야줘야함.  -->
						<button class="modal-default-button" @click="$emit('closing')">
							닫기
						</button>
					</div>
					<div class="modal-footer"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// 사용할 데이터들을 선언한다. 데이터는 return, 즉 함수여야한다.
	data() {
		return {
			modalHeader: "타이틀 입력 : ",
			modalBody: "내용 입력 : ",
			modalFooter: "타입 입력 : ",
			modalTitle: "",
			modalContents: "",
			modalType: "",
		};
	},
	// props : 부모 컴포넌트에서 자식컴포넌트로 내려온 데이터들을 받는다. 이름과 타입은 무조건 일치해야한다.
	props: {
		message: {
			type: String,
			default: "im default",
		},
		showModal: {
			type: Boolean,
			default: false,
		},
	},
	// 메소드 선언부 : 사용할 메소드들을 여기에 선언한다.
	methods: {
		showData() {},
		registData() {
			if (
				this.checkValidation(this.modalTitle) ||
				this.checkValidation(this.modalContents) ||
				this.checkValidation(this.modalType)
			) {
				alert("모두 입력해주세요.");
			} else {
				let jsonData = {
					contents: this.modalContents,
					title: this.modalTitle,
					type: this.modalType,
				};
				// 부모 컴포넌트의 @regist가 있는 곳으로 jsonData를 보낸다.
				this.$emit("regist-data", jsonData);
			}
		},
		checkValidation(value) {
			if (value === null || value === "" || value === "null") return true;

			return false;
		},
	},
	// 데이터 변경을 감지하는 watch 메소드
	// watch: {
	// 	showModal() {
	// 		console.log(this.showModal);
	// 	},
	// 	modalTitle() {
	// 		console.log(this.modalTitle);
	// 	},
	// 	modalContents() {
	// 		console.log(this.modalContents);
	// 	},
	// 	modalType() {
	// 		console.log(this.modalType);
	// 	},
	// },
};
</script>

<style scoped lang="scss">
#app {
	padding: 1rem;
}

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	display: block;
	margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
button {
	margin: 0;
	width: 60px;
	height: 30px;
	background: #fff;
	border: 1px solid black;
	cursor: pointer;
}
</style>
