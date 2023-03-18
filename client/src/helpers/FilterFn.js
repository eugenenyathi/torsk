import { ref } from "vue";
import usePagination from "../composables/usePagination.js";

const FilterFn = ([filterInput, data, currentDataDisplayed]) => {
	const filterMenuOpen = ref(false);
	const showReloadIcon = ref(false);
	const pageNumbers = ref([]);
	const { paginate, pagination } = usePagination();

	//clear filter input
	const clearFilterInput = () => (filterInput.value = "");

	//reload original data after search
	const reloadData = () => {
		console.log("reload");
		currentDataDisplayed.value = pagination(data.value);
		pageNumbers.value = paginate(data.value.length);
		showReloadIcon.value = false;
	};

	//search item popup
	const toggleFilterMenu = (action) => {
		if (action === "open") {
			filterMenuOpen.value = true;
		} else {
			filterMenuOpen.value = false;
		}
	};

	const searchData = () => {
		if (filterInput.value === "") return toggleFilterMenu("close");

		const searchResults = data.value.filter((item) => {
			return (
				item.name
					.toLowerCase()
					.includes(filterInput.value.toLowerCase()) ||
				item.user
					.toLowerCase()
					.includes(filterInput.value.toLowerCase())
			);
		});

		currentDataDisplayed.value = pagination(searchResults);
		pageNumbers.value = paginate(searchResults.length);
		showReloadIcon.value = true;
		toggleFilterMenu("close");
	};

	return {
		filterMenuOpen,
		showReloadIcon,
		reloadData,
		pageNumbers,
		toggleFilterMenu,
		searchData,
	};
};

export default FilterFn;
