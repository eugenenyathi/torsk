<template>
	<form @submit.prevent="handleSubmit" class="signup-personal-info">
		<span class="krynn-logo">Krynn</span>
		<h2
			:class="{
				header: !alert.show,
				'header show-alert': alert.show,
			}"
		>
			You are god in this planet.
		</h2>
		<Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
		<div class="signup-control personal-info fullName-control">
			<BaseInput
				class="signup-input firstName"
				v-model="fullName.firstName"
				placeholder="First Name"
			/>
			<BaseInput
				class="signup-input lastName"
				v-model="fullName.lastName"
				placeholder="Last Name"
			/>
		</div>

		<div class="signup-control personal-info">
			<BaseInput
				class="signup-input"
				v-model="username"
				placeholder="Username"
			/>
		</div>

		<div class="signup-control personal-info">
			<BaseInput
				class="signup-input"
				v-model="password"
				placeholder="Password"
			/>
		</div>

		<button class="signup-btn">Sign Up</button>
	</form>
</template>

<script setup>
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";

import Alert from "../components/Alert.vue";
import AlertFn from "../helpers/AlertFn.js";
import watchFn from "../helpers/watchFn";

import isEmpty from "../helpers/isEmpty";
import useSignup from "../composables/useSignup.js";

import { ref, reactive } from "vue";

const fullName = reactive({ firstName: "eugene", lastName: "nyathi" });
const username = ref("bosseugene");
const password = ref("12345678");

const emit = defineEmits(["forward"]);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);
const { watchAxiosErr } = watchFn();

const { axiosError, isLoading, signup } = useSignup();

watchAxiosErr(alert, axiosError);

const handleSubmit = async () => {
	if (isEmpty(fullName.firstName) || isEmpty(fullName.lastName)) {
		showAlert(true, "Please fill in all name fields", "danger");
		removeAlert();
	} else if (isEmpty(username.value) || username.value.length < 3) {
		if (isEmpty(username.value)) {
			showAlert(true, "Please fill in the username field", "danger");
			removeAlert();
		} else {
			showAlert(true, "Minimum username length is 3", "danger");
			removeAlert();
		}
	} else if (isEmpty(password.value) || password.value.length < 8) {
		if (isEmpty(password.value)) {
			showAlert(true, "Please fill in the password field", "danger");
			removeAlert();
		} else {
			showAlert(true, "Minimum password length is 8", "danger");
			removeAlert();
		}
	} else {
		console.log("Welcome to the planet");
		const data = {
			fullName: fullName.firstName + " " + fullName.lastName,
			username: username.value,
			password: password.value,
		};
		//send data to the backend
		const user = await signup(data);

		if (user) {
			showAlert(true, "Account created successfully.", "success");
			removeAlert();
			//send signal to parent component
			setTimeout(() => emit("forward"), 3000);
		}
	}
};
</script>
