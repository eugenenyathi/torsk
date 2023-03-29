import axios from "axios";
import useToken from "../composables/useToken";

const token = useToken();

axios.defaults.baseURL = "http://localhost:8083/api/v1/";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
