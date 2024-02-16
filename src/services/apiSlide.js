import { get } from "./libs/api";

export async function apiGetSlides(id) {
  return get(`/slides/one?id=${id}`);
}
