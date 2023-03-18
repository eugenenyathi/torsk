import { useRoute } from "vue-router";

const ActiveChildRoute = () => {
	const subIsActive = (input) => {
		const paths = Array.isArray(input) ? input : [input];
		return paths.some((path) => {
			return useRoute().path.indexOf(path) === 0; // current path starts with this path string
		});
	};

	return {
		subIsActive,
	};
};

export default ActiveChildRoute;
