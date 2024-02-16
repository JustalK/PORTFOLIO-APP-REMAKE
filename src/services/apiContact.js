import { get } from "./libs/api";

export async function apiGetMyself() {
  return get("/contacts/my-identity");
}
