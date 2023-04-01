import axios from "axios";
import useAxiosError from "./useAxiosError.js";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const usePostData = () => {
  const isLoading = ref(false);
  const axiosError = ref(null);
  const contextName = ref(null);
  const store = useStore();
  const router = useRouter();

  const postData = async (context, vueRoute, apiRoute) => {
    const formData = computed(() => store.getters.getTransitFormData);
    isLoading.value = true;

    setContextName(context, formData);

    try {
      //send data
      const { data } = await axios.post(apiRoute, { ...formData.value });

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${contextName.value} ${context}`,
      });

      isLoading.value = false;

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push(vueRoute);
      }, 3000);
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const putData = async (context, apiRoute, vueRoute = false) => {
    const formData = computed(() => store.getters.getTransitFormData);
    isLoading.value = true;

    setContextName(context, formData);

    try {
      //send data
      await axios.put(apiRoute, { ...formData.value });

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
        context: `${contextName.value} ${context}`,
      });

      //update global status
      isLoading.value = false;

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        if (vueRoute) router.push(vueRoute);
      }, 3000);
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const setContextName = (context, formData) => {
    if (
      context === "printer" ||
      context === "scanner" ||
      context === "router" ||
      context === "switch" ||
      context === "converter"
    ) {
      contextName.value = formData.value.model;
    } else if (context === "laptop" || context === "desktop") {
      contextName.value = formData.value.machine;
    } else if (context === "wifi") {
      contextName.value = formData.value.ssid;
    } else if (
      context === "tablet" ||
      context === "cellphone" ||
      context === "telephone"
    ) {
      contextName.value = formData.value.user;
    } else if (context === "line") {
      contextName.value = formData.value.extension;
    } else if (context === "address") {
      contextName.value = formData.value.address;
    } else if (context === "email") {
      contextName.value = formData.value.email;
    } else if (context === "software") {
      contextName.value = formData.value.category;
    }
  };

  return { isLoading, axiosError, postData, putData };
};

export default usePostData;
