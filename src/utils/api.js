import axios from "axios";

export default async function api(url, { data = undefined, method = "get" } = {}) {
  try {
    const res = await axios[method](url, data);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
}