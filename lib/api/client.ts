import { initClient } from "@ts-rest/core";
import { starshipContract } from "./starships";

export const apiClient = initClient(starshipContract, {
  baseUrl: "https://swapi.dev/api",
  baseHeaders: {},
});
