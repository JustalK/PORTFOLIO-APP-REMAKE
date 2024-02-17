import { get } from "./libs/api";

export async function apiGetResume() {
  return get("/resume");
}
