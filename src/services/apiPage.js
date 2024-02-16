import { get } from "./libs/api";

export async function apiGetPortfolioInformation() {
  return get(`/pages?name=portfolio`);
}
