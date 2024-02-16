import { API_URL } from "@env";

export async function get(url) {
  try {
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
