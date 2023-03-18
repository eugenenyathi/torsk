import { watch, computed } from "vue";
import usePagination from "../composables/usePagination.js";

const watchRows = (dataInView, data) => {
	const { pagination, rowsPerPage } = usePagination();

	console.log("Data: ", data);

	watch(rowsPerPage, () => {
		dataInView.value = pagination(data);
	});
};

export default watchRows;
