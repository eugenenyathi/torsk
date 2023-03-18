<template>
	<form @submit.prevent="handleSubmit" class="signup-root-password">
		<span class="krynn-logo">Krynn</span>
		<Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
		<Alert v-else="!alert.show" :msg="alertMsg" type="success" />
		<div class="signup-control root-password">
			<BaseInput
				class="signup-input"
				:type="pwdType.firstField"
				v-model="password"
				label="Password"
				placeholder="admin password"
			/>
			<button
				v-if="!showPassword.password"
				type="button"
				class="eye-icon"
				@click="togglePassword('first')"
			>
				<EyeOutline />
			</button>
			<button
				v-else
				type="button"
				class="eye-icon"
				@click="togglePassword('first')"
			>
				<EyeOffOutline />
			</button>
		</div>
		<div class="signup-control root-password">
			<BaseInput
				class="signup-input"
				:type="pwdType.secondField"
				v-model="confirmPassword"
				label="Confirm Password"
				placeholder="Confirm password"
			/>
			<button
				v-if="!showPassword.confirmPassword"
				type="button"
				class="eye-icon"
				@click="togglePassword('second')"
			>
				<EyeOutline />
			</button>

			<button
				v-else
				type="button"
				class="eye-icon"
				@click="togglePassword('second')"
			>
				<EyeOffOutline />
			</button>
		</div>
		<button class="signup-btn">Done</button>
	</form>
</template>
<script setup>
import { BaseInput } from "../base/";
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";

import Alert from "../components/Alert.vue";
import AlertFn from "../helpers/AlertFn.js";
import watchFn from "../helpers/watchFn";

import isEmpty from "../helpers/isEmpty";
import validatePassword from "../helpers/validatePassword";

import useSignup from "../composables/useSignup.js";

import { ref, reactive } from "vue";

const password = ref("Tw12345678!");
const confirmPassword = ref("Tw12345678!");
const pwdType = reactive({ firstField: "password", secondField: "password" });
const showPassword = reactive({ password: false, confirmPassword: false });
const error = ref("");

const alert = reactive({
	show: false,
	msg: "",
	type: "",
});

const alertMsg = ref("Please set the Admin password.");
const { showAlert, removeAlert } = AlertFn(alert);
const { watchAxiosErr } = watchFn();

const { axiosError, isLoading, rootPassword } = useSignup();

const togglePassword = (field) => {
	if (field === "first") {
		if (pwdType.firstField === "password") {
			showPassword.password = true;
			pwdType.firstField = "text";
		} else {
			showPassword.password = false;
			pwdType.firstField = "password";
		}
	} else {
		if (pwdType.secondField === "password") {
			showPassword.confirmPassword = true;
			pwdType.secondField = "text";
		} else {
			showPassword.confirmPassword = false;
			pwdType.secondField = "password";
		}
	}
};

watchAxiosErr(alert, axiosError);

const handleSubmit = async () => {
	if (isEmpty(password.value) || isEmpty(confirmPassword.value)) {
		showAlert(true, "Please fill in all password fields", "danger");
		removeAlert();
	} else if (password.value !== confirmPassword.value) {
		showAlert(true, "Passwords do not match", "danger");
		removeAlert();
	} else if (validatePassword(password.value) !== "ok") {
		error.value = validatePassword(password.value);
		showAlert(true, error, "danger");
		removeAlert();
	} else {
		await rootPassword(confirmPassword.value);
		// console.log("something went wrong");
	}
};
</script>
