import { get } from "./libs/api";

export async function apiGetJobs() {
  return get("/jobs");
}
