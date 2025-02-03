import Cookies from "js-cookie";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ORIGIN_URL = import.meta.env.VITE_ORIGIN_URL;
export const token = Cookies.get("token");