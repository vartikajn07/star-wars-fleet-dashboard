import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const starshipContract = c.router({
  getStarships: {
    method: "GET",
    path: "/starships/",
    query: z.object({
      search: z.string().optional(),
      page: z.string().optional(),
    }),
    responses: {
      200: z.object({
        count: z.number(),
        results: z.array(
          z.object({
            name: z.string(),
            model: z.string(),
            manufacturer: z.string(),
            crew: z.string(),
            hyperdrive_rating: z.string(),
            url: z.string(),
          })
        ),
      }),
    },
  },
});
