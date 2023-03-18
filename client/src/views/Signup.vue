<template>
	<main class="signup-container">
		<section
			:class="{
				'signup-content': page !== 1,
				'signup-content email-page': page === 1,
			}"
		>
			<div class="front-img-wrapper">
				<img :src="loginImg" alt="" class="front-img" />
			</div>
			<!-- components -->
			<Email v-if="page === 1" @signal="signal" />
			<PersonalInfo v-else-if="page === 2" @forward="forward" />
			<RootPassword v-else />
		</section>
	</main>
</template>

<script setup>
import Email from "../components/Email";
import PersonalInfo from "../components/PersonalInfo";
import RootPassword from "../components/RootPassword.vue";

import { ref } from "vue";
const loginImg = require("../assets/krynn-1.webp");

const page = ref(1);

const signal = () => {
	page.value = 2;
};

const forward = () => {
	page.value = 3;
};
</script>
