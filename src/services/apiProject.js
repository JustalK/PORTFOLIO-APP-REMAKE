import { get } from "./libs/api";
import { PROFESSIONAL_TAG_ID } from "@env";

export async function apiGetProjects(page) {
  return get(`/articles?page=${page}&tags=${PROFESSIONAL_TAG_ID}`);
}

export async function apiCountProjects() {
  return get(`/articles/count?tags=${PROFESSIONAL_TAG_ID}`);
}

export async function apiGetMenu() {
  return get(`/articles/menu`);
}

export async function apiGetOneProject(id) {
  return get(`/articles/one?id=${id}&populate=true`);
}

export async function apiGetOneBySlug(slug) {
  return get(`/articles/one?slug=${slug}&populate=true`);
}
