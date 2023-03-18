<template>
	<div class="signup-email-wrapper">
		<form v-if="emailForm === 1" @submit.prevent="handleEmail">
			<span class="krynn-logo">Krynn</span>
			<h2
				:class="{
					header: !alert.show,
					'header show-alert': alert.show,
				}"
			>
				Hey! Your shuttle awaits.
			</h2>
			<Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
			<div class="signup-control email-page">
				<BaseInput
					class="signup-input"
					type="email"
					v-model="email"
					label="Enter Email"
					placeholder="you@example.com"
				/>
			</div>
			<button class="signup-btn" :disabled="isLoading">Next</button>
			<router-link :to="{ name: 'Login' }" class="link link-center"
				>Go back</router-link
			>
		</form>
		<form v-else @submit.prevent="handleEmailCode">
			<span class="krynn-logo email-code">Krynn</span>
			<Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
			<Alert v-else :msg="emailNotf" type="success" />
			<div class="signup-control email-page">
				<BaseInput
					class="signup-input"
					type="text"
					v-model="emailCode"
					label="Enter Code"
					placeholder="e.g. 654789"
				/>
			</div>
			<button class="signup-btn" :disabled="isLoading">Confirm</button>
			<p class="link" @click="pop">Go back</p>
		</form>
	</div>
</template>

<script setup>
//components
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";
import Alert from "../components/Alert.vue";
import AlertFn from "../helpers/AlertFn.js";
import isEmpty from "../helpers/isEmpty";
import isEmail from "../helpers/isEmail";
import useEmailAuth from "../composables/useEmailAuth.js";

import { ref, reactive, watch } from "vue";

const emailForm = ref(2);
const email = ref("bosseugene@krynn.com");
const emailCode = ref("657882");
const emailNotf = ref("We have sent a six digit code to your email.");
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const {
	verifyEmail,
	verifyEmailCode,
	emailLogged,
	vCode,
	isLoading,
	axiosError,
} = useEmailAuth();

const emit = defineEmits(["signal"]);

const pop = () => {
	resetAlert();
	emailForm.value = 1;
};

watch(axiosError, (currentValue, oldValue) => {
	if (currentValue) {
		showAlert(true, currentValue, "danger");
		removeAlert();
	}

	axiosError.value = null;
});

const handleEmail = async () => {
	if (isEmpty(email.value)) {
		showAlert(true, "Please provide an email.", "danger");
		removeAlert();
	} else if (!isEmail(email.value)) {
		showAlert(true, "Please provide a valid email.", "danger");
		removeAlert();
	} else {
		await verifyEmail(email.value);
		if (emailLogged.value) {
			emailForm.value = 2;
			showAlert(true, emailNotf.value, "success");
		}
	}
};

const handleEmailCode = async () => {
	if (isEmpty(emailCode.value)) {
		showAlert(true, "Please provide a code", "danger");
		removeAlert();
	} else if (emailCode.value.length != 6) {
		showAlert(true, "Please provide a valid code", "danger");
	} else {
		//send code to the backend
		await verifyEmailCode(email.value);

		if (parseInt(emailCode.value) === vCode.value) {
			showAlert(true, "Email confirmed successfully.", "success");
			removeAlert();
			//send event to main component
			setTimeout(() => emit("signal"), 3000);
		} else {
			showAlert(
				true,
				"Email confirmation failed. Please try again.",
				"danger"
			);
		}
	}
};

const resetAlert = () => {
	alert.show = false;
	alert.msg = "";
	alert.type = "";
};
</script>
