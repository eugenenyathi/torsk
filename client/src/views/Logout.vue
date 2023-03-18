<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth.js";

const store = useStore();
const router = useRouter();
const { deleteAuthUser } = useAuth();

const logout = () => {
  //update global state
  store.dispatch("logout");
  //redirect to login
  router.push({ name: "Login" });
  //delete cookie
  deleteAuthUser();
};

logout();
</script>
