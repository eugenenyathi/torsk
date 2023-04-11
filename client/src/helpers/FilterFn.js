import { ref, computed } from "vue";
import { useStore } from "vuex";
import usePagination from "../composables/usePagination.js";

const FilterFn = (filterInput) => {
  const store = useStore();
  const filterMenuOpen = ref(false);
  const showReloadIcon = ref(false);
  const searchContext = ref(null);
  const { paginate, pagination } = usePagination();

  //clear filter input
  const clearFilterInput = () => (filterInput.value = "");

  //reload original data after search
  const reloadData = () => {
    //first retain the original data set
    const routeBackUpData = computed(() => store.getters.getRouteBackUpData);
    store.dispatch("setRouteData", routeBackUpData.value);

    pagination();
    //settings for the pagination bar
    const pageNumbers = paginate(routeBackUpData.value.length);
    store.dispatch("setPageNumbers", pageNumbers);

    showReloadIcon.value = false;
  };

  //search item popup
  const toggleFilterMenu = (action, context) => {
    if (action === "open") {
      searchContext.value = context;
      filterMenuOpen.value = true;
    } else {
      filterMenuOpen.value = false;
    }
  };

  const searchData = () => {
    if (filterInput.value === "") return toggleFilterMenu("close");

    const routeData = computed(() => store.getters.getRouteData);

    const searchResults = routeData.value.filter((item) => {
      return item[`${searchContext.value}`]
        .toLowerCase()
        .includes(filterInput.value.toLowerCase());
    });

    //update the route data with the search results
    //then paginate the data
    store.dispatch("setRouteData", searchResults);
    pagination();
    //settings for the pagination bar
    const pageNumbers = paginate(searchResults.length);
    store.dispatch("setPageNumbers", pageNumbers);

    showReloadIcon.value = true;
    toggleFilterMenu("close");
  };

  return {
    searchContext,
    filterMenuOpen,
    showReloadIcon,
    reloadData,
    toggleFilterMenu,
    searchData,
  };
};

export default FilterFn;
