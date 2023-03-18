import { useRoute } from "vue-router";

const parentRoute = () => {
	return useRoute().matched[useRoute().matched.length - 2];
};

export default parentRoute;
