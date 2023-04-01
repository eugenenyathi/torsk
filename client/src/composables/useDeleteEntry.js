import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "axios";

const useDeleteEntry = () => {
  const store = useStore();
  const router = useRouter();
  const isLoading = ref(false);
  const data = computed(() => store.getters.getTransitData);

  const deleteEntry = async () => {
    try {
      isLoading.value = true;

      const res = await axios.delete(
        `/torsk/${data.value.route}/${data.value._id}`
      );

      isLoading.value = false;
      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "deleted",
        context: data.value.user || data.value.location || data.value.category,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        navigateToRoute(data.value.route);
        store.commit("closeActionsMenu", false);
      }, 3000);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const navigateToRoute = (route) => {
    switch (route) {
      case "remote_desktop":
        router.push("/remote");
        break;
      case "email":
        router.push("/emails");
        break;
      case "software":
        router.push("/software");
        break;
      case "/networking/wifi":
        router.push("/networking/wifi");
      case "telephone":
        router.push("/telephones");
      //TODO the default case should be updating the state globally to reflect changes
      //for the other routes
    }
  };

  return { isLoading, deleteEntry };
};

export default useDeleteEntry;
