import { ref, computed } from "vue";
import { useStore } from "vuex";

const usePagination = () => {
	const store = useStore();
	const rowsPerPage = computed(() => store.getters.getRowsPerPage);

	const pageNumbers = ref([]);

	const pagination = (data, currentPage = 1) => {
		// console.log("Pagination: ", data);

		const indexOfLastElement = currentPage * rowsPerPage.value;
		const indexOfFirstElement = indexOfLastElement - rowsPerPage.value;
		const currentData = data.slice(indexOfFirstElement, indexOfLastElement);

		return currentData;
	};

	const paginate = (arrLength) => {
		// console.log("Paginate: ", arrLength);

		if (arrLength <= rowsPerPage.value) return [];

		for (let i = 1; i <= Math.ceil(arrLength / rowsPerPage.value); i++) {
			pageNumbers.value.push(i);
		}

		return pageNumbers.value;
	};

	const showCurrentPageData = (page, data, currentDataDisplayed) => {
		currentDataDisplayed.value = pagination(data.value, page);
	};

	return { pagination, paginate, rowsPerPage, showCurrentPageData };
};

export default usePagination;
